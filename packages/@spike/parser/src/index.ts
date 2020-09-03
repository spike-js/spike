import parser from "./parser";

parser()
  .then(res => console.log(
    "DEVELOPER BUILD\n",
    res
  ));

export default parser;