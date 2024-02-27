import { boot } from "quasar/wrappers";
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default boot(({ app }) => {
  app.component(VueQrcode.name, VueQrcode);
});
