import { createEffect } from "@lincode/reactivity";
import { forceGet } from "@lincode/utils";
import { Box3, Vector3 } from "three";
import { onBeforeRender } from "../../../../events/onBeforeRender";
import { getBVHMap } from "../../../../states/useBVHMap";
import { getCentripetal } from "../../../../states/useCentripetal";
import { getGravity } from "../../../../states/useGravity";
import { getRepulsion } from "../../../../states/useRepulsion";
import {
    box3,
    line3,
    vector3,
    vector3_,
    vector3_0,
    vector3__
} from "../../../utils/reusables";
import bvhContactMap from "./bvhContactMap";
import getWorldPosition from "../../../utils/getWorldPosition";
import { calBoundary } from "../../../utils/boundary";

import PhysicsObjectManager from "../index";
import { bvhCharacterSet } from "./bvhCharacterSet";
import { bvhManagerMap } from "./bvhManagerMap";
import { fpsRatio } from "../../../../engine/eventLoop";
import { getFirstLoad } from "../../../../states/useFirstLoad";
import { getBVHComputing } from "../../../../states/useBVHComputingCount";
import { getEditorPlay } from "../../../../states/useEditorPlay";

const makeWeakSet = () => new WeakSet();
let boxBounds: any = {
    min: {
        y: undefined,
        z: undefined,
        x: undefined
    },
    max: {
        y: undefined,
        z: undefined,
        x: undefined
    }
};
let oldDeltaVector = 0;
createEffect(
    function(this: PhysicsObjectManager) {
        if (!getEditorPlay() || !getFirstLoad() || getBVHComputing()) return;

        const bvhArray = getBVHMap();
        if (!bvhArray.length) return;

        const gravity = getGravity();
        const repulsion = getRepulsion();
        const delta = 0.02;

        const centripetal = getCentripetal();
        let firstLoad = true;
        let first = true;
        let firstPositionY = 0;
        const handle = onBeforeRender(() => {
                    bvhContactMap.clear();

                    for (const characterManager of bvhCharacterSet) {
                        const playerVelocity = characterManager.bvhVelocity!;
                        const player = characterManager.outerObject3d;
                        const capsuleHalfHeight = characterManager.bvhHalfHeight!;
                        const capsuleRadius = centripetal
                            ? capsuleHalfHeight
                            : characterManager.bvhRadius!;
                        if (centripetal) {
                            playerVelocity.add(
                                characterManager.bvhOnGround ||
                                characterManager._gravity === false
                                    ? vector3_0
                                    : getWorldPosition(player)
                                        .normalize()
                                        .multiplyScalar(
                                            delta * -gravity * fpsRatio[0]
                                        )
                            );
                        } else {
                            if (boxBounds.min.y && player.position.y >= boxBounds.min.y) {
                                playerVelocity.y +=
                                    characterManager.bvhOnGround ||
                                    characterManager._gravity === false
                                        ? 0
                                        : -0.2;
                            }
                            const updatePosition = characterManager.positionUpdate!;
                            updatePosition.x && (playerVelocity.x = 0);
                            updatePosition.y && (playerVelocity.y = 0);
                            updatePosition.z && (playerVelocity.z = 0);
                            updatePosition.reset();
                            // console.log(player.position, " player.position", playerVelocity,getWorldPosition(player));
                            player.position.addScaledVector(playerVelocity, delta);

                            player.updateMatrixWorld();

                            const { start, end } = line3;
                            end.copy(start.copy(player.position));

                            const yOffset = Math.max(capsuleHalfHeight - capsuleRadius, 0);
                            end.y += yOffset;
                            start.y -= yOffset;

                            const startOld = start.clone();

                            box3.setFromCenterAndSize(
                                player.position,
                                vector3__.set(
                                    capsuleRadius * 2,
                                    capsuleHalfHeight * 2,
                                    capsuleRadius * 2
                                )
                            );
                            const triPoint = vector3;
                            const capsulePoint = vector3_;
                            let distance = 0;
                            let direction: Vector3 | undefined;

                            let contact = false;
                            let intersect = false;
                            let mapManager: PhysicsObjectManager | undefined;

                            for (const boundsTree of bvhArray) {
                                mapManager = bvhManagerMap.get(boundsTree);
                                calBoundary(boxBounds, boundsTree.geometry.boundingBox);

                                boundsTree.shapecast({
                                    intersectsBounds: (box: Box3) =>
                                        box.intersectsBox(box3),
                                    intersectsTriangle: (tri) => {
                                        distance = tri.closestPointToSegment(
                                            line3,
                                            triPoint,
                                            capsulePoint
                                        );
                                        if (distance < 0.3) {
                                            intersect = true;
                                        }
                                        if (distance < capsuleRadius) {
                                            contact = true;
                                            direction = capsulePoint
                                                .sub(triPoint)
                                                .normalize()
                                                .multiplyScalar(capsuleRadius - distance);
                                            start.add(direction);
                                            end.add(direction);

                                        }
                                    }
                                });
                            }
                            if (contact && mapManager)
                                forceGet(bvhContactMap, characterManager, makeWeakSet).add(
                                    mapManager
                                );

                            const deltaVector = start.sub(startOld);
                            if (centripetal) characterManager.bvhOnGround = contact;
                            else {
                                characterManager.bvhOnGround = contact ||
                                    deltaVector.y >
                                    Math.abs(delta * playerVelocity.y * 0.25);

                                if (
                                    repulsion &&
                                    characterManager.bvhOnGround &&
                                    Math.abs(
                                        deltaVector.y /
                                        (deltaVector.x + deltaVector.z + Number.EPSILON)
                                    ) < repulsion
                                )
                                    characterManager.bvhOnGround = false;
                            }

                            const offset = Math.max(0.0, deltaVector.length() - 1e-5);
                            deltaVector.normalize().multiplyScalar(offset);
                            if (characterManager.bvhOnGround && first) {
                                console.log(player.position, "characterManager.bvhOnGround ");
                                first = false;
                                firstPositionY = player.position.y;
                                player.visible = true;
                                // @ts-ignore

                                // deltaVector.y =0
                            }
                            if (boxBounds.min.x && boxBounds.max.x) {
                                // @ts-ignore
                                // player.position.set(_firstInnerX || 0, _firstInnerY || 0, _firstInnerZ || 0);
                                if (boxBounds.min.x > player.position.x) {
                                    player.position.setX(boxBounds.min.x);
                                }
                                if (boxBounds.min.z > player.position.z) {
                                    player.position.setZ(boxBounds.min.z);
                                }
                                if (boxBounds.max.x < player.position.x) {
                                    player.position.setX(boxBounds.max.x);
                                }
                                if (boxBounds.max.z < player.position.z) {
                                    player.position.setZ(boxBounds.max.z);
                                }
                                if (boxBounds.min.y > player.position.y) {
                                    // @ts-ignore
                                    const { _firstInnerY, _firstInnerX, _firstInnerZ } = characterManager;
                                    player.position.set(_firstInnerX || 0, _firstInnerY || 0, _firstInnerZ || 0);
                                    characterManager.bvhOnGround = true;
                                }
                                if (intersect) {
                                    const { x, y, z } = player.position;
                                    player.position.set(x + 0.5, y + 1, z + 0.5);

                                }

                            }

                            // if (firstPositionY && firstPositionY > player.position.y) {
                            //     characterManager.bvhOnGround = true;
                            //     debugger;
                            // }

                            // @ts-ignore
                            if (firstLoad) {
                                firstLoad = false;
                                // @ts-ignore
                                const { _firstInnerY, _firstInnerX, _firstInnerZ } = characterManager;
                                const { x, y, z } = player.position;
                                // @ts-ignore
                                player.position.set(_firstInnerX || x, _firstInnerY || y, _firstInnerZ || z);
                            }
                            player.position.add(deltaVector);

                            if (deltaVector.x){
                                // console.log(deltaVector.x,'deltaVector.x')
                            }
                            if (deltaVector.z){
                                // console.log(deltaVector.z,'deltaVector.z')
                            }
                            // console.log(boxBounds, "boxBounds");
                            // console.log(player.position.y, "console.log( player.position)\n");


                            if (!characterManager.bvhOnGround) {
                                deltaVector.normalize();
                                playerVelocity.addScaledVector(
                                    deltaVector,
                                    -deltaVector.dot(playerVelocity)
                                );
                            } else playerVelocity.set(0, 0, 0);
                        }
                    }
                }
            )
        ;
        return () => {
            handle.cancel();
        };
    },
    [
        getBVHMap,
        getGravity,
        getRepulsion,
        getCentripetal,
        getEditorPlay,
        getFirstLoad,
        getBVHComputing
    ]
);
