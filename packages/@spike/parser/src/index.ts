import parser from "./parser";

parser()
  .then(res => console.log("DEVELOPER BUILD\n", res, res.length));

export default parser;