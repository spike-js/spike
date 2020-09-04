#!/usr/bin/env node
var __defineProperty = Object.defineProperty;
var __hasOwnProperty = Object.prototype.hasOwnProperty;
var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var __markAsModule = (target) => {
  return __defineProperty(target, "__esModule", {value: true});
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defineProperty(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module) => {
  __markAsModule(target);
  if (typeof module === "object" || typeof module === "function") {
    for (let key in module)
      if (!__hasOwnProperty.call(target, key) && key !== "default")
        __defineProperty(target, key, {get: () => module[key], enumerable: true});
  }
  return target;
};
var __toModule = (module) => {
  if (module && module.__esModule)
    return module;
  return __exportStar(__defineProperty({}, "default", {value: module, enumerable: true}), module);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (result) => {
      return result.done ? resolve(result.value) : Promise.resolve(result.value).then(fulfilled, rejected);
    };
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// ../../../node_modules/sade/node_modules/mri/lib/index.mjs
var require_lib = __commonJS((exports) => {
  __export(exports, {
    default: () => lib_default
  });
  function toArr(any) {
    return any == null ? [] : Array.isArray(any) ? any : [any];
  }
  function toVal(out, key, val, opts) {
    var x, old = out[key], nxt = !!~opts.string.indexOf(key) ? val == null || val === true ? "" : String(val) : typeof val === "boolean" ? val : !!~opts.boolean.indexOf(key) ? val === "false" ? false : val === "true" || (out._.push((x = +val, x * 0 === 0) ? x : val), !!val) : (x = +val, x * 0 === 0) ? x : val;
    out[key] = old == null ? nxt : Array.isArray(old) ? old.concat(nxt) : [old, nxt];
  }
  function lib_default(args, opts) {
    args = args || [];
    opts = opts || {};
    var k, arr, arg, name, val, out = {_: []};
    var i = 0, j = 0, idx = 0, len = args.length;
    const alibi = opts.alias !== void 0;
    const strict = opts.unknown !== void 0;
    const defaults = opts.default !== void 0;
    opts.alias = opts.alias || {};
    opts.string = toArr(opts.string);
    opts.boolean = toArr(opts.boolean);
    if (alibi) {
      for (k in opts.alias) {
        arr = opts.alias[k] = toArr(opts.alias[k]);
        for (i = 0; i < arr.length; i++) {
          (opts.alias[arr[i]] = arr.concat(k)).splice(i, 1);
        }
      }
    }
    for (i = opts.boolean.length; i-- > 0; ) {
      arr = opts.alias[opts.boolean[i]] || [];
      for (j = arr.length; j-- > 0; )
        opts.boolean.push(arr[j]);
    }
    for (i = opts.string.length; i-- > 0; ) {
      arr = opts.alias[opts.string[i]] || [];
      for (j = arr.length; j-- > 0; )
        opts.string.push(arr[j]);
    }
    if (defaults) {
      for (k in opts.default) {
        name = typeof opts.default[k];
        arr = opts.alias[k] = opts.alias[k] || [];
        if (opts[name] !== void 0) {
          opts[name].push(k);
          for (i = 0; i < arr.length; i++) {
            opts[name].push(arr[i]);
          }
        }
      }
    }
    const keys = strict ? Object.keys(opts.alias) : [];
    for (i = 0; i < len; i++) {
      arg = args[i];
      if (arg === "--") {
        out._ = out._.concat(args.slice(++i));
        break;
      }
      for (j = 0; j < arg.length; j++) {
        if (arg.charCodeAt(j) !== 45)
          break;
      }
      if (j === 0) {
        out._.push(arg);
      } else if (arg.substring(j, j + 3) === "no-") {
        name = arg.substring(j + 3);
        if (strict && !~keys.indexOf(name)) {
          return opts.unknown(arg);
        }
        out[name] = false;
      } else {
        for (idx = j + 1; idx < arg.length; idx++) {
          if (arg.charCodeAt(idx) === 61)
            break;
        }
        name = arg.substring(j, idx);
        val = arg.substring(++idx) || (i + 1 === len || ("" + args[i + 1]).charCodeAt(0) === 45 || args[++i]);
        arr = j === 2 ? [name] : name;
        for (idx = 0; idx < arr.length; idx++) {
          name = arr[idx];
          if (strict && !~keys.indexOf(name))
            return opts.unknown("-".repeat(j) + name);
          toVal(out, name, idx + 1 < arr.length || val, opts);
        }
      }
    }
    if (defaults) {
      for (k in opts.default) {
        if (out[k] === void 0) {
          out[k] = opts.default[k];
        }
      }
    }
    if (alibi) {
      for (k in out) {
        arr = opts.alias[k] || [];
        while (arr.length > 0) {
          out[arr.shift()] = out[k];
        }
      }
    }
    return out;
  }
});

// ../../../node_modules/sade/lib/utils.js
var require_utils = __commonJS((exports) => {
  const GAP = 4;
  const __ = "  ";
  const ALL = "__all__";
  const DEF = "__default__";
  const NL = "\n";
  function format(arr) {
    if (!arr.length)
      return "";
    let len = maxLen(arr.map((x) => x[0])) + GAP;
    let join2 = (a) => a[0] + " ".repeat(len - a[0].length) + a[1] + (a[2] == null ? "" : `  (default ${a[2]})`);
    return arr.map(join2);
  }
  function maxLen(arr) {
    let c = 0, d = 0, l = 0, i = arr.length;
    if (i)
      while (i--) {
        d = arr[i].length;
        if (d > c) {
          l = i;
          c = d;
        }
      }
    return arr[l].length;
  }
  function noop(s) {
    return s;
  }
  function section(str, arr, fn) {
    if (!arr || !arr.length)
      return "";
    let i = 0, out = "";
    out += NL + __ + str;
    for (; i < arr.length; i++) {
      out += NL + __ + __ + fn(arr[i]);
    }
    return out + NL;
  }
  exports.help = function(bin, tree, key, single) {
    let out = "", cmd = tree[key], pfx = `$ ${bin}`, all = tree[ALL];
    let prefix = (s) => `${pfx} ${s}`.replace(/\s+/g, " ");
    let tail = [["-h, --help", "Displays this message"]];
    if (key === DEF)
      tail.unshift(["-v, --version", "Displays current version"]);
    cmd.options = (cmd.options || []).concat(all.options, tail);
    if (cmd.options.length > 0)
      cmd.usage += " [options]";
    out += section("Description", cmd.describe, noop);
    out += section("Usage", [cmd.usage], prefix);
    if (!single && key === DEF) {
      let cmds = Object.keys(tree).filter((k) => !/__/.test(k));
      let text = cmds.map((k) => [k, (tree[k].describe || [""])[0]]);
      out += section("Available Commands", format(text), noop);
      out += NL + __ + "For more info, run any command with the `--help` flag";
      cmds.slice(0, 2).forEach((k) => {
        out += NL + __ + __ + `${pfx} ${k} --help`;
      });
      out += NL;
    } else if (!single && key !== DEF) {
      out += section("Aliases", cmd.alibi, prefix);
    }
    out += section("Options", format(cmd.options), noop);
    out += section("Examples", cmd.examples.map(prefix), noop);
    return out;
  };
  exports.error = function(bin, str, num = 1) {
    let out = section("ERROR", [str], noop);
    out += NL + __ + `Run \`$ ${bin} --help\` for more info.` + NL;
    console.error(out);
    process.exit(num);
  };
  exports.parse = function(str) {
    return (str || "").split(/^-{1,2}|,|\s+-{1,2}|\s+/).filter(Boolean);
  };
  exports.sentences = function(str) {
    return (str || "").replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
  };
});

// ../../../node_modules/sade/lib/index.js
var require_lib2 = __commonJS((exports, module) => {
  const mri = require_lib();
  const $ = require_utils();
  const ALL = "__all__";
  const DEF = "__default__";
  class Sade {
    constructor(name, isOne) {
      let [bin, ...rest] = name.split(/\s+/);
      isOne = isOne || rest.length > 0;
      this.bin = bin;
      this.ver = "0.0.0";
      this.default = "";
      this.tree = {};
      this.command(ALL);
      this.command([DEF].concat(isOne ? rest : "<command>").join(" "));
      this.single = isOne;
      this.curr = "";
    }
    command(str, desc, opts = {}) {
      if (this.single) {
        throw new Error('Disable "single" mode to add commands');
      }
      let cmd = [], usage = [], rgx = /(\[|<)/;
      str.split(/\s+/).forEach((x) => {
        (rgx.test(x.charAt(0)) ? usage : cmd).push(x);
      });
      cmd = cmd.join(" ");
      if (cmd in this.tree) {
        throw new Error(`Command already exists: ${cmd}`);
      }
      cmd.includes("__") || usage.unshift(cmd);
      usage = usage.join(" ");
      this.curr = cmd;
      if (opts.default)
        this.default = cmd;
      this.tree[cmd] = {usage, alibi: [], options: [], alias: {}, default: {}, examples: []};
      if (opts.alias)
        this.alias(opts.alias);
      if (desc)
        this.describe(desc);
      return this;
    }
    describe(str) {
      this.tree[this.curr || DEF].describe = Array.isArray(str) ? str : $.sentences(str);
      return this;
    }
    alias(...names) {
      if (this.single)
        throw new Error('Cannot call `alias()` in "single" mode');
      if (!this.curr)
        throw new Error("Cannot call `alias()` before defining a command");
      this.tree[this.curr].alibi = this.tree[this.curr].alibi.concat(...names);
      return this;
    }
    option(str, desc, val) {
      let cmd = this.tree[this.curr || ALL];
      let [flag, alias] = $.parse(str);
      if (alias && alias.length > 1)
        [flag, alias] = [alias, flag];
      str = `--${flag}`;
      if (alias && alias.length > 0) {
        str = `-${alias}, ${str}`;
        let old = cmd.alias[alias];
        cmd.alias[alias] = (old || []).concat(flag);
      }
      let arr = [str, desc || ""];
      if (val !== void 0) {
        arr.push(val);
        cmd.default[flag] = val;
      } else if (!alias) {
        cmd.default[flag] = void 0;
      }
      cmd.options.push(arr);
      return this;
    }
    action(handler) {
      this.tree[this.curr || DEF].handler = handler;
      return this;
    }
    example(str) {
      this.tree[this.curr || DEF].examples.push(str);
      return this;
    }
    version(str) {
      this.ver = str;
      return this;
    }
    parse(arr, opts = {}) {
      arr = arr.slice();
      let offset = 2, tmp, idx, isVoid, cmd;
      let alias = {h: "help", v: "version"};
      let argv = mri(arr.slice(offset), {alias});
      let isSingle = this.single;
      let bin = this.bin;
      let name = "";
      if (isSingle) {
        cmd = this.tree[DEF];
      } else {
        let k, i = 1, len = argv._.length + 1;
        for (; i < len; i++) {
          tmp = argv._.slice(0, i).join(" ");
          if (this.tree[tmp] !== void 0) {
            name = tmp;
            idx = arr.indexOf(tmp, 1);
          } else {
            for (k in this.tree) {
              if (this.tree[k].alibi.includes(tmp)) {
                idx = arr.indexOf(tmp);
                arr.splice(idx, 1, ...k.split(" "));
                name = k;
                break;
              }
            }
          }
        }
        cmd = this.tree[name];
        isVoid = cmd === void 0;
        if (isVoid) {
          if (this.default) {
            name = this.default;
            cmd = this.tree[name];
            arr.unshift(name);
            offset++;
          } else if (tmp) {
            return $.error(bin, `Invalid command: ${tmp}`);
          }
        }
      }
      if (argv.help)
        return this.help(!isSingle && !isVoid && name);
      if (argv.version)
        return this._version();
      if (!isSingle && cmd === void 0) {
        return $.error(bin, "No command specified.");
      }
      let all = this.tree[ALL];
      opts.alias = Object.assign(all.alias, cmd.alias, opts.alias);
      opts.default = Object.assign(all.default, cmd.default, opts.default);
      tmp = name.split(" ");
      idx = arr.indexOf(tmp[0], 2);
      if (!!~idx)
        arr.splice(idx, tmp.length);
      let vals = mri(arr.slice(offset), opts);
      if (!vals || typeof vals === "string") {
        return $.error(bin, vals || "Parsed unknown option flag(s)!");
      }
      let segs = cmd.usage.split(/\s+/);
      let reqs = segs.filter((x) => x.charAt(0) === "<");
      let args = vals._.splice(0, reqs.length);
      if (args.length < reqs.length) {
        if (name)
          bin += ` ${name}`;
        return $.error(bin, "Insufficient arguments!");
      }
      segs.filter((x) => x.charAt(0) === "[").forEach((_) => {
        args.push(vals._.shift());
      });
      args.push(vals);
      let handler = cmd.handler;
      return opts.lazy ? {args, name, handler} : handler.apply(null, args);
    }
    help(str) {
      console.log($.help(this.bin, this.tree, str || DEF, this.single));
    }
    _version() {
      console.log(`${this.bin}, ${this.ver}`);
    }
  }
  module.exports = (str, isOne) => new Sade(str, isOne);
});

// node_modules/esbuild/lib/main.js
var require_main = __commonJS((exports, module) => {
  var __defineProperty2 = Object.defineProperty;
  var __hasOwnProperty2 = Object.prototype.hasOwnProperty;
  var __markAsModule2 = (target) => {
    return __defineProperty2(target, "__esModule", {value: true});
  };
  var __exportStar2 = (target, module2) => {
    __markAsModule2(target);
    if (typeof module2 === "object" || typeof module2 === "function") {
      for (let key in module2)
        if (!__hasOwnProperty2.call(target, key) && key !== "default")
          __defineProperty2(target, key, {get: () => module2[key], enumerable: true});
    }
    return target;
  };
  var __toModule2 = (module2) => {
    if (module2 && module2.__esModule)
      return module2;
    return __exportStar2(__defineProperty2({}, "default", {value: module2, enumerable: true}), module2);
  };
  function encodePacket(packet) {
    let visit = (value) => {
      if (value === null) {
        bb.write8(0);
      } else if (typeof value === "boolean") {
        bb.write8(1);
        bb.write8(+value);
      } else if (typeof value === "number") {
        bb.write8(2);
        bb.write32(value);
      } else if (typeof value === "string") {
        bb.write8(3);
        bb.write(encodeUTF8(value));
      } else if (value instanceof Uint8Array) {
        bb.write8(4);
        bb.write(value);
      } else if (value instanceof Array) {
        bb.write8(5);
        bb.write32(value.length);
        for (let item of value) {
          visit(item);
        }
      } else {
        let keys = Object.keys(value);
        bb.write8(6);
        bb.write32(keys.length);
        for (let key of keys) {
          bb.write(encodeUTF8(key));
          visit(value[key]);
        }
      }
    };
    let bb = new ByteBuffer();
    bb.write32(0);
    bb.write32(packet.id << 1 | +!packet.isRequest);
    visit(packet.value);
    writeUInt32LE(bb.buf, bb.len - 4, 0);
    return bb.buf.subarray(0, bb.len);
  }
  function decodePacket(bytes) {
    let visit = () => {
      switch (bb.read8()) {
        case 0:
          return null;
        case 1:
          return !!bb.read8();
        case 2:
          return bb.read32();
        case 3:
          return decodeUTF8(bb.read());
        case 4:
          return bb.read();
        case 5: {
          let count = bb.read32();
          let value2 = [];
          for (let i = 0; i < count; i++) {
            value2.push(visit());
          }
          return value2;
        }
        case 6: {
          let count = bb.read32();
          let value2 = {};
          for (let i = 0; i < count; i++) {
            value2[decodeUTF8(bb.read())] = visit();
          }
          return value2;
        }
        default:
          throw new Error("Invalid packet");
      }
    };
    let bb = new ByteBuffer(bytes);
    let id = bb.read32();
    let isRequest = (id & 1) === 0;
    id >>>= 1;
    let value = visit();
    if (bb.ptr !== bytes.length) {
      throw new Error("Invalid packet");
    }
    return {id, isRequest, value};
  }
  class ByteBuffer {
    constructor(buf = new Uint8Array(1024)) {
      this.buf = buf;
      this.len = 0;
      this.ptr = 0;
    }
    _write(delta) {
      if (this.len + delta > this.buf.length) {
        let clone = new Uint8Array((this.len + delta) * 2);
        clone.set(this.buf);
        this.buf = clone;
      }
      this.len += delta;
      return this.len - delta;
    }
    write8(value) {
      let offset = this._write(1);
      this.buf[offset] = value;
    }
    write32(value) {
      let offset = this._write(4);
      writeUInt32LE(this.buf, value, offset);
    }
    write(bytes) {
      let offset = this._write(4 + bytes.length);
      writeUInt32LE(this.buf, bytes.length, offset);
      this.buf.set(bytes, offset + 4);
    }
    _read(delta) {
      if (this.ptr + delta > this.buf.length) {
        throw new Error("Invalid packet");
      }
      this.ptr += delta;
      return this.ptr - delta;
    }
    read8() {
      return this.buf[this._read(1)];
    }
    read32() {
      return readUInt32LE(this.buf, this._read(4));
    }
    read() {
      let length = this.read32();
      let bytes = new Uint8Array(length);
      let ptr = this._read(bytes.length);
      bytes.set(this.buf.subarray(ptr, ptr + length));
      return bytes;
    }
  }
  let encodeUTF8;
  let decodeUTF8;
  if (typeof TextEncoder !== "undefined" && typeof TextDecoder !== "undefined") {
    let encoder = new TextEncoder();
    let decoder = new TextDecoder();
    encodeUTF8 = (text) => encoder.encode(text);
    decodeUTF8 = (bytes) => decoder.decode(bytes);
  } else if (typeof Buffer !== "undefined") {
    encodeUTF8 = (text) => Buffer.from(text);
    decodeUTF8 = (bytes) => Buffer.from(bytes).toString();
  } else {
    throw new Error("No UTF-8 codec found");
  }
  function readUInt32LE(buffer, offset) {
    return buffer[offset++] | buffer[offset++] << 8 | buffer[offset++] << 16 | buffer[offset++] << 24;
  }
  function writeUInt32LE(buffer, value, offset) {
    buffer[offset++] = value;
    buffer[offset++] = value >> 8;
    buffer[offset++] = value >> 16;
    buffer[offset++] = value >> 24;
  }
  function validateTarget(target) {
    target += "";
    if (target.indexOf(",") >= 0)
      throw new Error(`Invalid target: ${target}`);
    return target;
  }
  function pushCommonFlags(flags, options2, isTTY2, logLevelDefault) {
    if (options2.target) {
      if (options2.target instanceof Array)
        flags.push(`--target=${Array.from(options2.target).map(validateTarget).join(",")}`);
      else
        flags.push(`--target=${validateTarget(options2.target)}`);
    }
    if (options2.strict === true)
      flags.push(`--strict`);
    else if (options2.strict)
      for (let key of options2.strict)
        flags.push(`--strict:${key}`);
    if (options2.minify)
      flags.push("--minify");
    if (options2.minifySyntax)
      flags.push("--minify-syntax");
    if (options2.minifyWhitespace)
      flags.push("--minify-whitespace");
    if (options2.minifyIdentifiers)
      flags.push("--minify-identifiers");
    if (options2.jsxFactory)
      flags.push(`--jsx-factory=${options2.jsxFactory}`);
    if (options2.jsxFragment)
      flags.push(`--jsx-fragment=${options2.jsxFragment}`);
    if (options2.define) {
      for (let key in options2.define) {
        if (key.indexOf("=") >= 0)
          throw new Error(`Invalid define: ${key}`);
        flags.push(`--define:${key}=${options2.define[key]}`);
      }
    }
    if (options2.pure)
      for (let fn of options2.pure)
        flags.push(`--pure:${fn}`);
    if (options2.color)
      flags.push(`--color=${options2.color}`);
    else if (isTTY2)
      flags.push(`--color=true`);
    flags.push(`--log-level=${options2.logLevel || logLevelDefault}`);
    flags.push(`--error-limit=${options2.errorLimit || 0}`);
  }
  function flagsForBuildOptions(options2, isTTY2) {
    let flags = [];
    let stdinContents = null;
    let stdinResolveDir = null;
    pushCommonFlags(flags, options2, isTTY2, "info");
    if (options2.sourcemap)
      flags.push(`--sourcemap${options2.sourcemap === true ? "" : `=${options2.sourcemap}`}`);
    if (options2.globalName)
      flags.push(`--global-name=${options2.globalName}`);
    if (options2.bundle)
      flags.push("--bundle");
    if (options2.splitting)
      flags.push("--splitting");
    if (options2.metafile)
      flags.push(`--metafile=${options2.metafile}`);
    if (options2.outfile)
      flags.push(`--outfile=${options2.outfile}`);
    if (options2.outdir)
      flags.push(`--outdir=${options2.outdir}`);
    if (options2.platform)
      flags.push(`--platform=${options2.platform}`);
    if (options2.format)
      flags.push(`--format=${options2.format}`);
    if (options2.tsconfig)
      flags.push(`--tsconfig=${options2.tsconfig}`);
    if (options2.resolveExtensions)
      flags.push(`--resolve-extensions=${options2.resolveExtensions.join(",")}`);
    if (options2.external)
      for (let name of options2.external)
        flags.push(`--external:${name}`);
    if (options2.loader) {
      for (let ext in options2.loader) {
        if (ext.indexOf("=") >= 0)
          throw new Error(`Invalid extension: ${ext}`);
        flags.push(`--loader:${ext}=${options2.loader[ext]}`);
      }
    }
    if (options2.outExtension) {
      for (let ext in options2.outExtension) {
        if (ext.indexOf("=") >= 0)
          throw new Error(`Invalid extension: ${ext}`);
        flags.push(`--out-extension:${ext}=${options2.outExtension[ext]}`);
      }
    }
    if (options2.entryPoints) {
      for (let entryPoint of options2.entryPoints) {
        if (entryPoint.startsWith("-"))
          throw new Error(`Invalid entry point: ${entryPoint}`);
        flags.push(entryPoint);
      }
    }
    if (options2.stdin) {
      let {contents, resolveDir, sourcefile, loader} = options2.stdin;
      if (sourcefile)
        flags.push(`--sourcefile=${sourcefile}`);
      if (loader)
        flags.push(`--loader=${loader}`);
      if (resolveDir)
        stdinResolveDir = resolveDir + "";
      stdinContents = contents ? contents + "" : "";
    }
    return [flags, stdinContents, stdinResolveDir];
  }
  function flagsForTransformOptions(options2, isTTY2) {
    let flags = [];
    pushCommonFlags(flags, options2, isTTY2, "silent");
    if (options2.sourcemap)
      flags.push(`--sourcemap=${options2.sourcemap === true ? "external" : options2.sourcemap}`);
    if (options2.sourcefile)
      flags.push(`--sourcefile=${options2.sourcefile}`);
    if (options2.loader)
      flags.push(`--loader=${options2.loader}`);
    return flags;
  }
  function createChannel(options2) {
    let callbacks = new Map();
    let isClosed = false;
    let nextID = 0;
    let stdout = new Uint8Array(16 * 1024);
    let stdoutUsed = 0;
    let readFromStdout = (chunk) => {
      let limit = stdoutUsed + chunk.length;
      if (limit > stdout.length) {
        let swap = new Uint8Array(limit * 2);
        swap.set(stdout);
        stdout = swap;
      }
      stdout.set(chunk, stdoutUsed);
      stdoutUsed += chunk.length;
      let offset = 0;
      while (offset + 4 <= stdoutUsed) {
        let length = readUInt32LE(stdout, offset);
        if (offset + 4 + length > stdoutUsed) {
          break;
        }
        offset += 4;
        handleIncomingPacket(stdout.slice(offset, offset + length));
        offset += length;
      }
      if (offset > 0) {
        stdout.set(stdout.slice(offset));
        stdoutUsed -= offset;
      }
    };
    let afterClose = () => {
      isClosed = true;
      for (let callback of callbacks.values()) {
        callback("The service was stopped", null);
      }
      callbacks.clear();
    };
    let sendRequest = (value, callback) => {
      if (isClosed)
        return callback("The service is no longer running", null);
      let id = nextID++;
      callbacks.set(id, callback);
      options2.writeToStdin(encodePacket({id, isRequest: true, value}));
    };
    let sendResponse = (id, value) => {
      if (isClosed)
        throw new Error("The service is no longer running");
      options2.writeToStdin(encodePacket({id, isRequest: false, value}));
    };
    let handleRequest = (id, command, request) => {
      try {
        switch (command) {
          default:
            throw new Error(`Invalid command: ` + command);
        }
      } catch (e) {
        let error = "Internal error";
        try {
          error = e + "";
        } catch (e2) {
        }
        sendResponse(id, {error});
      }
    };
    let handleIncomingPacket = (bytes) => {
      let packet = decodePacket(bytes);
      if (packet.isRequest) {
        handleRequest(packet.id, packet.value[0], packet.value[1]);
      } else {
        let callback = callbacks.get(packet.id);
        callbacks.delete(packet.id);
        if (packet.value.error)
          callback(packet.value.error, {});
        else
          callback(null, packet.value);
      }
    };
    return {
      readFromStdout,
      afterClose,
      service: {
        build(options22, isTTY2, callback) {
          let [flags, stdin, resolveDir] = flagsForBuildOptions(options22, isTTY2);
          let write = options22.write !== false;
          sendRequest(["build", {flags, write, stdin, resolveDir}], (error, response) => {
            if (error)
              return callback(new Error(error), null);
            let errors = response.errors;
            let warnings = response.warnings;
            if (errors.length > 0)
              return callback(failureErrorWithLog("Build failed", errors, warnings), null);
            let result = {warnings};
            if (!write)
              result.outputFiles = response.outputFiles;
            callback(null, result);
          });
        },
        transform(input, options22, isTTY2, fs22, callback) {
          let flags = flagsForTransformOptions(options22, isTTY2);
          input += "";
          let start = (inputPath) => {
            sendRequest(["transform", {
              flags,
              inputFS: inputPath !== null,
              input: inputPath !== null ? inputPath : input
            }], (error, response) => {
              if (error)
                return callback(new Error(error), null);
              let errors = response.errors;
              let warnings = response.warnings;
              let outstanding = 1;
              let next = () => --outstanding === 0 && callback(null, {warnings, js: response.js, jsSourceMap: response.jsSourceMap});
              if (errors.length > 0)
                return callback(failureErrorWithLog("Transform failed", errors, warnings), null);
              if (response.jsFS) {
                outstanding++;
                fs22.readFile(response.js, (err, contents) => {
                  if (err !== null) {
                    callback(err, null);
                  } else {
                    response.js = contents;
                    next();
                  }
                });
              }
              if (response.jsSourceMapFS) {
                outstanding++;
                fs22.readFile(response.jsSourceMap, (err, contents) => {
                  if (err !== null) {
                    callback(err, null);
                  } else {
                    response.jsSourceMap = contents;
                    next();
                  }
                });
              }
              next();
            });
          };
          if (input.length > 1024 * 1024) {
            let next = start;
            start = () => fs22.writeFile(input, next);
          }
          start(null);
        }
      }
    };
  }
  function failureErrorWithLog(text, errors, warnings) {
    let limit = 5;
    let summary = errors.length < 1 ? "" : ` with ${errors.length} error${errors.length < 2 ? "" : "s"}:` + errors.slice(0, limit + 1).map((e, i) => {
      if (i === limit)
        return "\n...";
      if (!e.location)
        return `
error: ${e.text}`;
      let {file, line, column} = e.location;
      return `
${file}:${line}:${column}: error: ${e.text}`;
    }).join("");
    let error = new Error(`${text}${summary}`);
    error.errors = errors;
    error.warnings = warnings;
    return error;
  }
  const child_process = __toModule2(require("child_process"));
  const crypto = __toModule2(require("crypto"));
  const path2 = __toModule2(require("path"));
  const fs3 = __toModule2(require("fs"));
  const os = __toModule2(require("os"));
  const tty = __toModule2(require("tty"));
  let esbuildCommandAndArgs = () => {
    if (false) {
      return ["node", [path2.join(__dirname, "..", "bin", "esbuild")]];
    }
    if (process.platform === "win32") {
      return [path2.join(__dirname, "..", "esbuild.exe"), []];
    }
    return [path2.join(__dirname, "..", "bin", "esbuild"), []];
  };
  let isTTY = () => tty.isatty(2);
  let build2 = (options2) => {
    return startService2().then((service) => {
      let promise = service.build(options2);
      promise.then(service.stop, service.stop);
      return promise;
    });
  };
  let transform = (input, options2) => {
    return startService2().then((service) => {
      let promise = service.transform(input, options2);
      promise.then(service.stop, service.stop);
      return promise;
    });
  };
  let buildSync = (options2) => {
    let result;
    runServiceSync((service) => service.build(options2, isTTY(), (err, res) => {
      if (err)
        throw err;
      result = res;
    }));
    return result;
  };
  let transformSync = (input, options2) => {
    let result;
    runServiceSync((service) => service.transform(input, options2 || {}, isTTY(), {
      readFile(tempFile, callback) {
        try {
          let contents = fs3.readFileSync(tempFile, "utf8");
          try {
            fs3.unlinkSync(tempFile);
          } catch (e) {
          }
          callback(null, contents);
        } catch (err) {
          callback(err, null);
        }
      },
      writeFile(contents, callback) {
        try {
          let tempFile = randomFileName();
          fs3.writeFileSync(tempFile, contents);
          callback(tempFile);
        } catch (e) {
          callback(null);
        }
      }
    }, (err, res) => {
      if (err)
        throw err;
      result = res;
    }));
    return result;
  };
  let startService2 = (options2) => {
    if (options2) {
      if (options2.wasmURL)
        throw new Error(`The "wasmURL" option only works in the browser`);
      if (options2.worker)
        throw new Error(`The "worker" option only works in the browser`);
    }
    let [command, args] = esbuildCommandAndArgs();
    let child = child_process.spawn(command, args.concat("--service"), {
      cwd: process.cwd(),
      windowsHide: true,
      stdio: ["pipe", "pipe", "inherit"]
    });
    let {readFromStdout, afterClose, service} = createChannel({
      writeToStdin(bytes) {
        child.stdin.write(bytes);
      }
    });
    child.stdout.on("data", readFromStdout);
    child.stdout.on("end", afterClose);
    return Promise.resolve({
      build: (options22) => new Promise((resolve, reject) => service.build(options22, isTTY(), (err, res) => err ? reject(err) : resolve(res))),
      transform: (input, options22) => new Promise((resolve, reject) => service.transform(input, options22 || {}, isTTY(), {
        readFile(tempFile, callback) {
          try {
            fs3.readFile(tempFile, "utf8", (err, contents) => {
              try {
                fs3.unlink(tempFile, () => callback(err, contents));
              } catch (e) {
                callback(err, contents);
              }
            });
          } catch (err) {
            callback(err, null);
          }
        },
        writeFile(contents, callback) {
          try {
            let tempFile = randomFileName();
            fs3.writeFile(tempFile, contents, (err) => err !== null ? callback(null) : callback(tempFile));
          } catch (e) {
            callback(null);
          }
        }
      }, (err, res) => err ? reject(err) : resolve(res))),
      stop() {
        child.kill();
      }
    });
  };
  let runServiceSync = (callback) => {
    let [command, args] = esbuildCommandAndArgs();
    let stdin = new Uint8Array();
    let {readFromStdout, afterClose, service} = createChannel({
      writeToStdin(bytes) {
        if (stdin.length !== 0)
          throw new Error("Must run at most one command");
        stdin = bytes;
      }
    });
    callback(service);
    let stdout = child_process.execFileSync(command, args.concat("--service"), {
      cwd: process.cwd(),
      windowsHide: true,
      input: stdin,
      maxBuffer: +process.env.ESBUILD_MAX_BUFFER || 16 * 1024 * 1024
    });
    readFromStdout(stdout);
    afterClose();
  };
  let randomFileName = () => {
    return path2.join(os.tmpdir(), `esbuild-${crypto.randomBytes(32).toString("hex")}`);
  };
  let api = {
    build: build2,
    buildSync,
    transform,
    transformSync,
    startService: startService2
  };
  module.exports = api;
});

// src/commands/build.ts
const fs = __toModule(require("fs"));
const esbuild = __toModule(require_main());
function addBuildCommand(prog, options2) {
  prog.command("build <...entryPoints>", "TODO", {default: true}).describe("Build your Spike project once").action(buildCommandHandler(options2));
}
function buildCommandHandler(options2) {
  return (entryPoints) => __async(this, [], function* () {
    const esbuild2 = yield esbuild.startService();
    try {
      const files = entryPoints.split(",");
      const outputBundles = yield Promise.all(files.map((file) => __async(this, [], function* () {
        return yield fs.promises.readFile(file, {encoding: "utf-8"});
      })).map((file) => __async(this, [], function* () {
        return {
          file: yield file,
          data: yield esbuild2.transform(yield file)
        };
      })));
      const results = yield Promise.all(outputBundles.map((bundle) => __async(this, [], function* () {
        const bundlePath = bundle.file.replace(options2.workingDirectory, options2.outputDirectory).replace(".ts", ".js");
        const bundleMapPath = bundle.file.replace(options2.workingDirectory, options2.outputDirectory).replace(".ts", ".map.js");
        fs.promises.writeFile(bundlePath, bundle.data.js, {encoding: "utf-8"});
        fs.promises.writeFile(bundleMapPath, bundle.data.js, {encoding: "utf-8"});
        return {
          file: bundlePath,
          map: bundleMapPath,
          entry: bundle.file,
          data: bundle.data
        };
      })));
      console.log(results);
    } catch (error) {
      throw error;
    } finally {
      esbuild2.stop();
    }
  });
}
var build_default = addBuildCommand;

// src/cli.ts
const sade = __toModule(require_lib2());
const CLI = sade.default("spike-scripts");
function createCommandLine(options2) {
  return __async(this, [], function* () {
    build_default(CLI, options2);
    return (argv) => CLI.parse(argv);
  });
}

// src/bin.ts
const path = __toModule(require("path"));
const options = {
  workingDirectory: process.cwd(),
  outputDirectory: path.join(process.cwd(), "./build")
};
createCommandLine(options).then((cli2) => {
  cli2(process.argv);
  process.exit(0);
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
