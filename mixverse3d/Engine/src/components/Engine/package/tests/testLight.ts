import { AreaLight, Cube } from "../index"

let box = new Cube()

let light = new AreaLight()
light.z = 3000
light.y = 3000
light.lookAt(box)
