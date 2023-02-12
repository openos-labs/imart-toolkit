import {UploadModelStyle as Styled} from "./styles";
import {useDropzone} from "react-dropzone";
import {useCallback, useState} from "react";
import {AwsUploadModel} from "../../utils/formate";
import {v4 as uuidv4} from "uuid";
import {ToBlob} from "../../utils/MetaverseModelFun/ExporterToZip";

const size = 5 * 1024 * 1024; // 以5MB为一个分片
interface props {
    getUrl?: (e: string) => void;
}

export const UploadSpace = ({getUrl}: props) => {
    const [awsUrl, setAwsUrl] = useState("");
    const [awsFileUrl, setAwsFileUrl] = useState("");

    const [loading, setLoading] = useState(false);
    const [loadingFile, setLoadingFile] = useState(false);

    const onDrop = useCallback((acceptedFiles: any) => {
        setAwsUrl("");
        setLoading(true);
        acceptedFiles.forEach((file: any) => {
            console.log(file, "file");
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = async (e: any) => {
                const name = file.name.split(".")[0];
                const totalSize = file.size;
                const result = e.target.result;
                const total = file.size / size; // 总的分为几片
                for (let idx: number = 0; idx <= total; idx++) {
                    let end = size * (idx + 1);
                    if (end >= file.size) {
                        end = file.size;
                    }
                    const chunk = result.slice(size * idx, end);
                    let blob = new Blob([chunk]);
                    console.log(await ToBlob(blob, name + idx), "await  ToBlob(blob, name + idx)");
                }
                const mainFest = new File([JSON.stringify({
                    total: Math.ceil(total),
                    name,
                    version: uuidv4()
                })], `${name}.json`, {
                    type: "text/plain"
                });
                const mainFileUrl = await AwsUploadModel(mainFest);
                // console.log(await ToBlob(blob, name + idx), "await  ToBlob(blob, name + idx)");
                setAwsUrl(mainFileUrl);
                setLoading(false);
            };
        });

    }, []);
    const onDropFile = useCallback((acceptedFiles: any) => {
        setAwsFileUrl("");
        setLoadingFile(true);
        acceptedFiles.forEach((file: any) => {
            console.log(file, "file");
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = async (e: any) => {


                const name = file.name.split(".")[0];
                const mainFileUrl = await AwsUploadModel(file);
                setAwsFileUrl(mainFileUrl);

                setLoadingFile(false);
                console.log(mainFileUrl);
                // let modelUrl = window.URL.createObjectURL(blob);

                // const loader = new GLTFLoader().setDRACOLoader(new DRACOLoader().setDecoderPath(WASM_URL));
                // loader.setMeshoptDecoder(MeshoptDecoder);
                // loader.load(modelUrl, async (gltf: GLTF) => {
                //     const modelUrl = await ExporterToZip(gltf, name);
                //     console.log(modelUrl, "modelUrl");
                //     setAwsUrl(modelUrl);
                //     getUrl && getUrl(modelUrl);
                //     setLoading(false);
                // }, () => {
                //
                // }, async (err) => {
                //     if (String(err).includes("KTX2")) {
                //         const modelUrl = await ExporterToZip(blob, name);
                //         console.log(modelUrl, "modelUrl");
                //         setAwsUrl(modelUrl);
                //         getUrl && getUrl(modelUrl);
                //         setLoading(false);
                //     }
                // });

            };
        });

    }, []);

    const {getRootProps, getInputProps, open} = useDropzone({noClick: true, onDrop});
    const {getRootProps: getPros, getInputProps: inputProps, open: fileOpen} = useDropzone({
        noClick: true,
        onDrop: onDropFile
    });

    return <> <Styled.Wrap {...getRootProps()}>
        <input {...getInputProps()} />
    </Styled.Wrap>
    </>;
};
