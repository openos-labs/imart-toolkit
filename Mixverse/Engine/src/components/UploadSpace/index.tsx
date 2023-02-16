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
                const result = e.target.result;
                const total = file.size / size; // 总的分为几片
                for (let idx: number = 0; idx <= total; idx++) {
                    let end = size * (idx + 1);
                    if (end >= file.size) {
                        end = file.size;
                    }
                    const chunk = result.slice(size * idx, end);
                    let blob = new Blob([chunk]);
                    await ToBlob(blob, name + idx)
                }
                const mainFest = new File([JSON.stringify({
                    total: Math.ceil(total),
                    name,
                    version: uuidv4()
                })], `${name}.json`, {
                    type: "text/plain"
                });
                const mainFileUrl = await AwsUploadModel(mainFest);
                setAwsUrl(mainFileUrl);
                setLoading(false);
            };
        });

    }, []);

    const {getRootProps, getInputProps, open} = useDropzone({noClick: true, onDrop});


    return <> <Styled.Wrap {...getRootProps()}>
        <input {...getInputProps()} />
    </Styled.Wrap>
    </>;
};
