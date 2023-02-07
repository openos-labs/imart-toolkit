import styled from "styled-components";

export namespace UploadModelStyle {
    export const Wrap = styled("div")`
      height: 100%;
      margin: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      transition: border-color .2s;
      border: 3px dashed #ccc;
      border-radius: 8px;
      box-sizing: border-box;
    `;
}
