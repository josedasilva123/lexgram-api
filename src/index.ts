import { connect } from "./config/db";
import { serverHttp } from "./server";
import './websocket'

const port = process.env.PORT || 3030;

serverHttp.listen(port, async () => {
    await connect();
    console.log(`Aplicação iniciada com sucesso na porta: ${port}`);
})
