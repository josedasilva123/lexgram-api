import fs from "fs";

export class File {
   async delete(path: string) {
      fs.unlink(path, () => {
         console.log("Arquivo deletado com sucesso!");
      });
   }
}
