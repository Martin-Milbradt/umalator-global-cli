var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/commander/lib/error.js
var require_error = __commonJS({
  "node_modules/commander/lib/error.js"(exports2) {
    var CommanderError2 = class extends Error {
      /**
       * Constructs the CommanderError class
       * @param {number} exitCode suggested exit code which could be used with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @constructor
       */
      constructor(exitCode, code, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.exitCode = exitCode;
        this.nestedError = void 0;
      }
    };
    var InvalidArgumentError2 = class extends CommanderError2 {
      /**
       * Constructs the InvalidArgumentError class
       * @param {string} [message] explanation of why argument is invalid
       * @constructor
       */
      constructor(message) {
        super(1, "commander.invalidArgument", message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
      }
    };
    exports2.CommanderError = CommanderError2;
    exports2.InvalidArgumentError = InvalidArgumentError2;
  }
});

// node_modules/commander/lib/argument.js
var require_argument = __commonJS({
  "node_modules/commander/lib/argument.js"(exports2) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Argument2 = class {
      /**
       * Initialize a new command argument with the given name and description.
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @param {string} name
       * @param {string} [description]
       */
      constructor(name, description) {
        this.description = description || "";
        this.variadic = false;
        this.parseArg = void 0;
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.argChoices = void 0;
        switch (name[0]) {
          case "<":
            this.required = true;
            this._name = name.slice(1, -1);
            break;
          case "[":
            this.required = false;
            this._name = name.slice(1, -1);
            break;
          default:
            this.required = true;
            this._name = name;
            break;
        }
        if (this._name.length > 3 && this._name.slice(-3) === "...") {
          this.variadic = true;
          this._name = this._name.slice(0, -3);
        }
      }
      /**
       * Return argument name.
       *
       * @return {string}
       */
      name() {
        return this._name;
      }
      /**
       * @api private
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {any} value
       * @param {string} [description]
       * @return {Argument}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Set the custom handler for processing CLI command arguments into argument values.
       *
       * @param {Function} [fn]
       * @return {Argument}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Only allow argument value to be one of choices.
       *
       * @param {string[]} values
       * @return {Argument}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(`Allowed choices are ${this.argChoices.join(", ")}.`);
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Make argument required.
       */
      argRequired() {
        this.required = true;
        return this;
      }
      /**
       * Make argument optional.
       */
      argOptional() {
        this.required = false;
        return this;
      }
    };
    function humanReadableArgName(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
      return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
    }
    exports2.Argument = Argument2;
    exports2.humanReadableArgName = humanReadableArgName;
  }
});

// node_modules/commander/lib/help.js
var require_help = __commonJS({
  "node_modules/commander/lib/help.js"(exports2) {
    var { humanReadableArgName } = require_argument();
    var Help2 = class {
      constructor() {
        this.helpWidth = void 0;
        this.sortSubcommands = false;
        this.sortOptions = false;
        this.showGlobalOptions = false;
      }
      /**
       * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
       *
       * @param {Command} cmd
       * @returns {Command[]}
       */
      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
        if (cmd._hasImplicitHelpCommand()) {
          const [, helpName, helpArgs] = cmd._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/);
          const helpCommand = cmd.createCommand(helpName).helpOption(false);
          helpCommand.description(cmd._helpCommandDescription);
          if (helpArgs)
            helpCommand.arguments(helpArgs);
          visibleCommands.push(helpCommand);
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            return a.name().localeCompare(b.name());
          });
        }
        return visibleCommands;
      }
      /**
       * Compare options for sort.
       *
       * @param {Option} a
       * @param {Option} b
       * @returns number
       */
      compareOptions(a, b) {
        const getSortKey = (option) => {
          return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
        };
        return getSortKey(a).localeCompare(getSortKey(b));
      }
      /**
       * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden);
        const showShortHelpFlag = cmd._hasHelpOption && cmd._helpShortFlag && !cmd._findOption(cmd._helpShortFlag);
        const showLongHelpFlag = cmd._hasHelpOption && !cmd._findOption(cmd._helpLongFlag);
        if (showShortHelpFlag || showLongHelpFlag) {
          let helpOption;
          if (!showShortHelpFlag) {
            helpOption = cmd.createOption(cmd._helpLongFlag, cmd._helpDescription);
          } else if (!showLongHelpFlag) {
            helpOption = cmd.createOption(cmd._helpShortFlag, cmd._helpDescription);
          } else {
            helpOption = cmd.createOption(cmd._helpFlags, cmd._helpDescription);
          }
          visibleOptions.push(helpOption);
        }
        if (this.sortOptions) {
          visibleOptions.sort(this.compareOptions);
        }
        return visibleOptions;
      }
      /**
       * Get an array of the visible global options. (Not including help.)
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleGlobalOptions(cmd) {
        if (!this.showGlobalOptions)
          return [];
        const globalOptions = [];
        for (let parentCmd = cmd.parent; parentCmd; parentCmd = parentCmd.parent) {
          const visibleOptions = parentCmd.options.filter((option) => !option.hidden);
          globalOptions.push(...visibleOptions);
        }
        if (this.sortOptions) {
          globalOptions.sort(this.compareOptions);
        }
        return globalOptions;
      }
      /**
       * Get an array of the arguments if any have a description.
       *
       * @param {Command} cmd
       * @returns {Argument[]}
       */
      visibleArguments(cmd) {
        if (cmd._argsDescription) {
          cmd._args.forEach((argument) => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
          });
        }
        if (cmd._args.find((argument) => argument.description)) {
          return cmd._args;
        }
        return [];
      }
      /**
       * Get the command term to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandTerm(cmd) {
        const args = cmd._args.map((arg) => humanReadableArgName(arg)).join(" ");
        return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
        (args ? " " + args : "");
      }
      /**
       * Get the option term to show in the list of options.
       *
       * @param {Option} option
       * @returns {string}
       */
      optionTerm(option) {
        return option.flags;
      }
      /**
       * Get the argument term to show in the list of arguments.
       *
       * @param {Argument} argument
       * @returns {string}
       */
      argumentTerm(argument) {
        return argument.name();
      }
      /**
       * Get the longest command term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(max, helper.subcommandTerm(command).length);
        }, 0);
      }
      /**
       * Get the longest option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
      /**
       * Get the longest global option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestGlobalOptionTermLength(cmd, helper) {
        return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
      /**
       * Get the longest argument term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(max, helper.argumentTerm(argument).length);
        }, 0);
      }
      /**
       * Get the command usage to be displayed at the top of the built-in help.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandUsage(cmd) {
        let cmdName = cmd._name;
        if (cmd._aliases[0]) {
          cmdName = cmdName + "|" + cmd._aliases[0];
        }
        let parentCmdNames = "";
        for (let parentCmd = cmd.parent; parentCmd; parentCmd = parentCmd.parent) {
          parentCmdNames = parentCmd.name() + " " + parentCmdNames;
        }
        return parentCmdNames + cmdName + " " + cmd.usage();
      }
      /**
       * Get the description for the command.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandDescription(cmd) {
        return cmd.description();
      }
      /**
       * Get the subcommand summary to show in the list of subcommands.
       * (Fallback to description for backwards compatibility.)
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandDescription(cmd) {
        return cmd.summary() || cmd.description();
      }
      /**
       * Get the option description to show in the list of options.
       *
       * @param {Option} option
       * @return {string}
       */
      optionDescription(option) {
        const extraInfo = [];
        if (option.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (option.defaultValue !== void 0) {
          const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
          if (showDefault) {
            extraInfo.push(`default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`);
          }
        }
        if (option.presetArg !== void 0 && option.optional) {
          extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
        }
        if (option.envVar !== void 0) {
          extraInfo.push(`env: ${option.envVar}`);
        }
        if (extraInfo.length > 0) {
          return `${option.description} (${extraInfo.join(", ")})`;
        }
        return option.description;
      }
      /**
       * Get the argument description to show in the list of arguments.
       *
       * @param {Argument} argument
       * @return {string}
       */
      argumentDescription(argument) {
        const extraInfo = [];
        if (argument.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (argument.defaultValue !== void 0) {
          extraInfo.push(`default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`);
        }
        if (extraInfo.length > 0) {
          const extraDescripton = `(${extraInfo.join(", ")})`;
          if (argument.description) {
            return `${argument.description} ${extraDescripton}`;
          }
          return extraDescripton;
        }
        return argument.description;
      }
      /**
       * Generate the built-in help text.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {string}
       */
      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = helper.helpWidth || 80;
        const itemIndentWidth = 2;
        const itemSeparatorWidth = 2;
        function formatItem(term, description) {
          if (description) {
            const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`;
            return helper.wrap(fullText, helpWidth - itemIndentWidth, termWidth + itemSeparatorWidth);
          }
          return term;
        }
        function formatList(textArray) {
          return textArray.join("\n").replace(/^/gm, " ".repeat(itemIndentWidth));
        }
        let output = [`Usage: ${helper.commandUsage(cmd)}`, ""];
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
          output = output.concat([commandDescription, ""]);
        }
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return formatItem(helper.argumentTerm(argument), helper.argumentDescription(argument));
        });
        if (argumentList.length > 0) {
          output = output.concat(["Arguments:", formatList(argumentList), ""]);
        }
        const optionList = helper.visibleOptions(cmd).map((option) => {
          return formatItem(helper.optionTerm(option), helper.optionDescription(option));
        });
        if (optionList.length > 0) {
          output = output.concat(["Options:", formatList(optionList), ""]);
        }
        if (this.showGlobalOptions) {
          const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
            return formatItem(helper.optionTerm(option), helper.optionDescription(option));
          });
          if (globalOptionList.length > 0) {
            output = output.concat(["Global Options:", formatList(globalOptionList), ""]);
          }
        }
        const commandList = helper.visibleCommands(cmd).map((cmd2) => {
          return formatItem(helper.subcommandTerm(cmd2), helper.subcommandDescription(cmd2));
        });
        if (commandList.length > 0) {
          output = output.concat(["Commands:", formatList(commandList), ""]);
        }
        return output.join("\n");
      }
      /**
       * Calculate the pad width from the maximum term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestGlobalOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        );
      }
      /**
       * Wrap the given string to width characters per line, with lines after the first indented.
       * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
       *
       * @param {string} str
       * @param {number} width
       * @param {number} indent
       * @param {number} [minColumnWidth=40]
       * @return {string}
       *
       */
      wrap(str, width, indent, minColumnWidth = 40) {
        if (str.match(/[\n]\s+/))
          return str;
        const columnWidth = width - indent;
        if (columnWidth < minColumnWidth)
          return str;
        const leadingStr = str.slice(0, indent);
        const columnText = str.slice(indent);
        const indentString = " ".repeat(indent);
        const regex = new RegExp(".{1," + (columnWidth - 1) + "}([\\s\u200B]|$)|[^\\s\u200B]+?([\\s\u200B]|$)", "g");
        const lines = columnText.match(regex) || [];
        return leadingStr + lines.map((line, i) => {
          if (line.slice(-1) === "\n") {
            line = line.slice(0, line.length - 1);
          }
          return (i > 0 ? indentString : "") + line.trimRight();
        }).join("\n");
      }
    };
    exports2.Help = Help2;
  }
});

// node_modules/commander/lib/option.js
var require_option = __commonJS({
  "node_modules/commander/lib/option.js"(exports2) {
    var { InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var Option2 = class {
      /**
       * Initialize a new `Option` with the given `flags` and `description`.
       *
       * @param {string} flags
       * @param {string} [description]
       */
      constructor(flags, description) {
        this.flags = flags;
        this.description = description || "";
        this.required = flags.includes("<");
        this.optional = flags.includes("[");
        this.variadic = /\w\.\.\.[>\]]$/.test(flags);
        this.mandatory = false;
        const optionFlags = splitOptionFlags(flags);
        this.short = optionFlags.shortFlag;
        this.long = optionFlags.longFlag;
        this.negate = false;
        if (this.long) {
          this.negate = this.long.startsWith("--no-");
        }
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.presetArg = void 0;
        this.envVar = void 0;
        this.parseArg = void 0;
        this.hidden = false;
        this.argChoices = void 0;
        this.conflictsWith = [];
        this.implied = void 0;
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {any} value
       * @param {string} [description]
       * @return {Option}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Preset to use when option used without option-argument, especially optional but also boolean and negated.
       * The custom processing (parseArg) is called.
       *
       * @example
       * new Option('--color').default('GREYSCALE').preset('RGB');
       * new Option('--donate [amount]').preset('20').argParser(parseFloat);
       *
       * @param {any} arg
       * @return {Option}
       */
      preset(arg) {
        this.presetArg = arg;
        return this;
      }
      /**
       * Add option name(s) that conflict with this option.
       * An error will be displayed if conflicting options are found during parsing.
       *
       * @example
       * new Option('--rgb').conflicts('cmyk');
       * new Option('--js').conflicts(['ts', 'jsx']);
       *
       * @param {string | string[]} names
       * @return {Option}
       */
      conflicts(names) {
        this.conflictsWith = this.conflictsWith.concat(names);
        return this;
      }
      /**
       * Specify implied option values for when this option is set and the implied options are not.
       *
       * The custom processing (parseArg) is not called on the implied values.
       *
       * @example
       * program
       *   .addOption(new Option('--log', 'write logging information to file'))
       *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
       *
       * @param {Object} impliedOptionValues
       * @return {Option}
       */
      implies(impliedOptionValues) {
        this.implied = Object.assign(this.implied || {}, impliedOptionValues);
        return this;
      }
      /**
       * Set environment variable to check for option value.
       *
       * An environment variable is only used if when processed the current option value is
       * undefined, or the source of the current value is 'default' or 'config' or 'env'.
       *
       * @param {string} name
       * @return {Option}
       */
      env(name) {
        this.envVar = name;
        return this;
      }
      /**
       * Set the custom handler for processing CLI option arguments into option values.
       *
       * @param {Function} [fn]
       * @return {Option}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Whether the option is mandatory and must have a value after parsing.
       *
       * @param {boolean} [mandatory=true]
       * @return {Option}
       */
      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory;
        return this;
      }
      /**
       * Hide option in help.
       *
       * @param {boolean} [hide=true]
       * @return {Option}
       */
      hideHelp(hide = true) {
        this.hidden = !!hide;
        return this;
      }
      /**
       * @api private
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Option}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError2(`Allowed choices are ${this.argChoices.join(", ")}.`);
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Return option name.
       *
       * @return {string}
       */
      name() {
        if (this.long) {
          return this.long.replace(/^--/, "");
        }
        return this.short.replace(/^-/, "");
      }
      /**
       * Return option name, in a camelcase format that can be used
       * as a object attribute key.
       *
       * @return {string}
       * @api private
       */
      attributeName() {
        return camelcase(this.name().replace(/^no-/, ""));
      }
      /**
       * Check if `arg` matches the short or long flag.
       *
       * @param {string} arg
       * @return {boolean}
       * @api private
       */
      is(arg) {
        return this.short === arg || this.long === arg;
      }
      /**
       * Return whether a boolean option.
       *
       * Options are one of boolean, negated, required argument, or optional argument.
       *
       * @return {boolean}
       * @api private
       */
      isBoolean() {
        return !this.required && !this.optional && !this.negate;
      }
    };
    var DualOptions = class {
      /**
       * @param {Option[]} options
       */
      constructor(options) {
        this.positiveOptions = /* @__PURE__ */ new Map();
        this.negativeOptions = /* @__PURE__ */ new Map();
        this.dualOptions = /* @__PURE__ */ new Set();
        options.forEach((option) => {
          if (option.negate) {
            this.negativeOptions.set(option.attributeName(), option);
          } else {
            this.positiveOptions.set(option.attributeName(), option);
          }
        });
        this.negativeOptions.forEach((value, key) => {
          if (this.positiveOptions.has(key)) {
            this.dualOptions.add(key);
          }
        });
      }
      /**
       * Did the value come from the option, and not from possible matching dual option?
       *
       * @param {any} value
       * @param {Option} option
       * @returns {boolean}
       */
      valueFromOption(value, option) {
        const optionKey = option.attributeName();
        if (!this.dualOptions.has(optionKey))
          return true;
        const preset = this.negativeOptions.get(optionKey).presetArg;
        const negativeValue = preset !== void 0 ? preset : false;
        return option.negate === (negativeValue === value);
      }
    };
    function camelcase(str) {
      return str.split("-").reduce((str2, word) => {
        return str2 + word[0].toUpperCase() + word.slice(1);
      });
    }
    function splitOptionFlags(flags) {
      let shortFlag;
      let longFlag;
      const flagParts = flags.split(/[ |,]+/);
      if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1]))
        shortFlag = flagParts.shift();
      longFlag = flagParts.shift();
      if (!shortFlag && /^-[^-]$/.test(longFlag)) {
        shortFlag = longFlag;
        longFlag = void 0;
      }
      return { shortFlag, longFlag };
    }
    exports2.Option = Option2;
    exports2.splitOptionFlags = splitOptionFlags;
    exports2.DualOptions = DualOptions;
  }
});

// node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS({
  "node_modules/commander/lib/suggestSimilar.js"(exports2) {
    var maxDistance = 3;
    function editDistance(a, b) {
      if (Math.abs(a.length - b.length) > maxDistance)
        return Math.max(a.length, b.length);
      const d = [];
      for (let i = 0; i <= a.length; i++) {
        d[i] = [i];
      }
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
      }
      for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
          let cost = 1;
          if (a[i - 1] === b[j - 1]) {
            cost = 0;
          } else {
            cost = 1;
          }
          d[i][j] = Math.min(
            d[i - 1][j] + 1,
            // deletion
            d[i][j - 1] + 1,
            // insertion
            d[i - 1][j - 1] + cost
            // substitution
          );
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
          }
        }
      }
      return d[a.length][b.length];
    }
    function suggestSimilar(word, candidates) {
      if (!candidates || candidates.length === 0)
        return "";
      candidates = Array.from(new Set(candidates));
      const searchingOptions = word.startsWith("--");
      if (searchingOptions) {
        word = word.slice(2);
        candidates = candidates.map((candidate) => candidate.slice(2));
      }
      let similar = [];
      let bestDistance = maxDistance;
      const minSimilarity = 0.4;
      candidates.forEach((candidate) => {
        if (candidate.length <= 1)
          return;
        const distance = editDistance(word, candidate);
        const length = Math.max(word.length, candidate.length);
        const similarity = (length - distance) / length;
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            bestDistance = distance;
            similar = [candidate];
          } else if (distance === bestDistance) {
            similar.push(candidate);
          }
        }
      });
      similar.sort((a, b) => a.localeCompare(b));
      if (searchingOptions) {
        similar = similar.map((candidate) => `--${candidate}`);
      }
      if (similar.length > 1) {
        return `
(Did you mean one of ${similar.join(", ")}?)`;
      }
      if (similar.length === 1) {
        return `
(Did you mean ${similar[0]}?)`;
      }
      return "";
    }
    exports2.suggestSimilar = suggestSimilar;
  }
});

// node_modules/commander/lib/command.js
var require_command = __commonJS({
  "node_modules/commander/lib/command.js"(exports2) {
    var EventEmitter = require("events").EventEmitter;
    var childProcess = require("child_process");
    var path = require("path");
    var fs = require("fs");
    var process2 = require("process");
    var { Argument: Argument2, humanReadableArgName } = require_argument();
    var { CommanderError: CommanderError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2, splitOptionFlags, DualOptions } = require_option();
    var { suggestSimilar } = require_suggestSimilar();
    var Command2 = class _Command extends EventEmitter {
      /**
       * Initialize a new `Command`.
       *
       * @param {string} [name]
       */
      constructor(name) {
        super();
        this.commands = [];
        this.options = [];
        this.parent = null;
        this._allowUnknownOption = false;
        this._allowExcessArguments = true;
        this._args = [];
        this.args = [];
        this.rawArgs = [];
        this.processedArgs = [];
        this._scriptPath = null;
        this._name = name || "";
        this._optionValues = {};
        this._optionValueSources = {};
        this._storeOptionsAsProperties = false;
        this._actionHandler = null;
        this._executableHandler = false;
        this._executableFile = null;
        this._executableDir = null;
        this._defaultCommandName = null;
        this._exitCallback = null;
        this._aliases = [];
        this._combineFlagAndOptionalValue = true;
        this._description = "";
        this._summary = "";
        this._argsDescription = void 0;
        this._enablePositionalOptions = false;
        this._passThroughOptions = false;
        this._lifeCycleHooks = {};
        this._showHelpAfterError = false;
        this._showSuggestionAfterError = true;
        this._outputConfiguration = {
          writeOut: (str) => process2.stdout.write(str),
          writeErr: (str) => process2.stderr.write(str),
          getOutHelpWidth: () => process2.stdout.isTTY ? process2.stdout.columns : void 0,
          getErrHelpWidth: () => process2.stderr.isTTY ? process2.stderr.columns : void 0,
          outputError: (str, write) => write(str)
        };
        this._hidden = false;
        this._hasHelpOption = true;
        this._helpFlags = "-h, --help";
        this._helpDescription = "display help for command";
        this._helpShortFlag = "-h";
        this._helpLongFlag = "--help";
        this._addImplicitHelpCommand = void 0;
        this._helpCommandName = "help";
        this._helpCommandnameAndArgs = "help [command]";
        this._helpCommandDescription = "display help for command";
        this._helpConfiguration = {};
      }
      /**
       * Copy settings that are useful to have in common across root command and subcommands.
       *
       * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
       *
       * @param {Command} sourceCommand
       * @return {Command} `this` command for chaining
       */
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration;
        this._hasHelpOption = sourceCommand._hasHelpOption;
        this._helpFlags = sourceCommand._helpFlags;
        this._helpDescription = sourceCommand._helpDescription;
        this._helpShortFlag = sourceCommand._helpShortFlag;
        this._helpLongFlag = sourceCommand._helpLongFlag;
        this._helpCommandName = sourceCommand._helpCommandName;
        this._helpCommandnameAndArgs = sourceCommand._helpCommandnameAndArgs;
        this._helpCommandDescription = sourceCommand._helpCommandDescription;
        this._helpConfiguration = sourceCommand._helpConfiguration;
        this._exitCallback = sourceCommand._exitCallback;
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
        this._allowExcessArguments = sourceCommand._allowExcessArguments;
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
        this._showHelpAfterError = sourceCommand._showHelpAfterError;
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
        return this;
      }
      /**
       * Define a command.
       *
       * There are two styles of command: pay attention to where to put the description.
       *
       * @example
       * // Command implemented using action handler (description is supplied separately to `.command`)
       * program
       *   .command('clone <source> [destination]')
       *   .description('clone a repository into a newly created directory')
       *   .action((source, destination) => {
       *     console.log('clone command called');
       *   });
       *
       * // Command implemented using separate executable file (description is second parameter to `.command`)
       * program
       *   .command('start <service>', 'start named service')
       *   .command('stop [service]', 'stop named service, or all if no name supplied');
       *
       * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
       * @param {Object|string} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
       * @param {Object} [execOpts] - configuration options (for executable)
       * @return {Command} returns new command for action handler, or `this` for executable command
       */
      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc;
        let opts = execOpts;
        if (typeof desc === "object" && desc !== null) {
          opts = desc;
          desc = null;
        }
        opts = opts || {};
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const cmd = this.createCommand(name);
        if (desc) {
          cmd.description(desc);
          cmd._executableHandler = true;
        }
        if (opts.isDefault)
          this._defaultCommandName = cmd._name;
        cmd._hidden = !!(opts.noHelp || opts.hidden);
        cmd._executableFile = opts.executableFile || null;
        if (args)
          cmd.arguments(args);
        this.commands.push(cmd);
        cmd.parent = this;
        cmd.copyInheritedSettings(this);
        if (desc)
          return this;
        return cmd;
      }
      /**
       * Factory routine to create a new unattached command.
       *
       * See .command() for creating an attached subcommand, which uses this routine to
       * create the command. You can override createCommand to customise subcommands.
       *
       * @param {string} [name]
       * @return {Command} new command
       */
      createCommand(name) {
        return new _Command(name);
      }
      /**
       * You can customise the help with a subclass of Help by overriding createHelp,
       * or by overriding Help properties using configureHelp().
       *
       * @return {Help}
       */
      createHelp() {
        return Object.assign(new Help2(), this.configureHelp());
      }
      /**
       * You can customise the help by overriding Help properties using configureHelp(),
       * or with a subclass of Help by overriding createHelp().
       *
       * @param {Object} [configuration] - configuration options
       * @return {Command|Object} `this` command for chaining, or stored configuration
       */
      configureHelp(configuration) {
        if (configuration === void 0)
          return this._helpConfiguration;
        this._helpConfiguration = configuration;
        return this;
      }
      /**
       * The default output goes to stdout and stderr. You can customise this for special
       * applications. You can also customise the display of errors by overriding outputError.
       *
       * The configuration properties are all functions:
       *
       *     // functions to change where being written, stdout and stderr
       *     writeOut(str)
       *     writeErr(str)
       *     // matching functions to specify width for wrapping help
       *     getOutHelpWidth()
       *     getErrHelpWidth()
       *     // functions based on what is being written out
       *     outputError(str, write) // used for displaying errors, and not used for displaying help
       *
       * @param {Object} [configuration] - configuration options
       * @return {Command|Object} `this` command for chaining, or stored configuration
       */
      configureOutput(configuration) {
        if (configuration === void 0)
          return this._outputConfiguration;
        Object.assign(this._outputConfiguration, configuration);
        return this;
      }
      /**
       * Display the help or a custom message after an error occurs.
       *
       * @param {boolean|string} [displayHelp]
       * @return {Command} `this` command for chaining
       */
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== "string")
          displayHelp = !!displayHelp;
        this._showHelpAfterError = displayHelp;
        return this;
      }
      /**
       * Display suggestion of similar commands for unknown commands, or options for unknown options.
       *
       * @param {boolean} [displaySuggestion]
       * @return {Command} `this` command for chaining
       */
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion;
        return this;
      }
      /**
       * Add a prepared subcommand.
       *
       * See .command() for creating an attached subcommand which inherits settings from its parent.
       *
       * @param {Command} cmd - new subcommand
       * @param {Object} [opts] - configuration options
       * @return {Command} `this` command for chaining
       */
      addCommand(cmd, opts) {
        if (!cmd._name) {
          throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
        }
        opts = opts || {};
        if (opts.isDefault)
          this._defaultCommandName = cmd._name;
        if (opts.noHelp || opts.hidden)
          cmd._hidden = true;
        this.commands.push(cmd);
        cmd.parent = this;
        return this;
      }
      /**
       * Factory routine to create a new unattached argument.
       *
       * See .argument() for creating an attached argument, which uses this routine to
       * create the argument. You can override createArgument to return a custom argument.
       *
       * @param {string} name
       * @param {string} [description]
       * @return {Argument} new argument
       */
      createArgument(name, description) {
        return new Argument2(name, description);
      }
      /**
       * Define argument syntax for command.
       *
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @example
       * program.argument('<input-file>');
       * program.argument('[output-file]');
       *
       * @param {string} name
       * @param {string} [description]
       * @param {Function|*} [fn] - custom argument processing function
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      argument(name, description, fn, defaultValue) {
        const argument = this.createArgument(name, description);
        if (typeof fn === "function") {
          argument.default(defaultValue).argParser(fn);
        } else {
          argument.default(fn);
        }
        this.addArgument(argument);
        return this;
      }
      /**
       * Define argument syntax for command, adding multiple at once (without descriptions).
       *
       * See also .argument().
       *
       * @example
       * program.arguments('<cmd> [env]');
       *
       * @param {string} names
       * @return {Command} `this` command for chaining
       */
      arguments(names) {
        names.split(/ +/).forEach((detail) => {
          this.argument(detail);
        });
        return this;
      }
      /**
       * Define argument syntax for command, adding a prepared argument.
       *
       * @param {Argument} argument
       * @return {Command} `this` command for chaining
       */
      addArgument(argument) {
        const previousArgument = this._args.slice(-1)[0];
        if (previousArgument && previousArgument.variadic) {
          throw new Error(`only the last argument can be variadic '${previousArgument.name()}'`);
        }
        if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
          throw new Error(`a default value for a required argument is never used: '${argument.name()}'`);
        }
        this._args.push(argument);
        return this;
      }
      /**
       * Override default decision whether to add implicit help command.
       *
       *    addHelpCommand() // force on
       *    addHelpCommand(false); // force off
       *    addHelpCommand('help [cmd]', 'display help for [cmd]'); // force on with custom details
       *
       * @return {Command} `this` command for chaining
       */
      addHelpCommand(enableOrNameAndArgs, description) {
        if (enableOrNameAndArgs === false) {
          this._addImplicitHelpCommand = false;
        } else {
          this._addImplicitHelpCommand = true;
          if (typeof enableOrNameAndArgs === "string") {
            this._helpCommandName = enableOrNameAndArgs.split(" ")[0];
            this._helpCommandnameAndArgs = enableOrNameAndArgs;
          }
          this._helpCommandDescription = description || this._helpCommandDescription;
        }
        return this;
      }
      /**
       * @return {boolean}
       * @api private
       */
      _hasImplicitHelpCommand() {
        if (this._addImplicitHelpCommand === void 0) {
          return this.commands.length && !this._actionHandler && !this._findCommand("help");
        }
        return this._addImplicitHelpCommand;
      }
      /**
       * Add hook for life cycle event.
       *
       * @param {string} event
       * @param {Function} listener
       * @return {Command} `this` command for chaining
       */
      hook(event, listener) {
        const allowedValues = ["preSubcommand", "preAction", "postAction"];
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener);
        } else {
          this._lifeCycleHooks[event] = [listener];
        }
        return this;
      }
      /**
       * Register callback to use as replacement for calling process.exit.
       *
       * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
       * @return {Command} `this` command for chaining
       */
      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn;
        } else {
          this._exitCallback = (err) => {
            if (err.code !== "commander.executeSubCommandAsync") {
              throw err;
            } else {
            }
          };
        }
        return this;
      }
      /**
       * Call process.exit, and _exitCallback if defined.
       *
       * @param {number} exitCode exit code for using with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @return never
       * @api private
       */
      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError2(exitCode, code, message));
        }
        process2.exit(exitCode);
      }
      /**
       * Register callback `fn` for the command.
       *
       * @example
       * program
       *   .command('serve')
       *   .description('start service')
       *   .action(function() {
       *      // do work here
       *   });
       *
       * @param {Function} fn
       * @return {Command} `this` command for chaining
       */
      action(fn) {
        const listener = (args) => {
          const expectedArgsCount = this._args.length;
          const actionArgs = args.slice(0, expectedArgsCount);
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this;
          } else {
            actionArgs[expectedArgsCount] = this.opts();
          }
          actionArgs.push(this);
          return fn.apply(this, actionArgs);
        };
        this._actionHandler = listener;
        return this;
      }
      /**
       * Factory routine to create a new unattached option.
       *
       * See .option() for creating an attached option, which uses this routine to
       * create the option. You can override createOption to return a custom option.
       *
       * @param {string} flags
       * @param {string} [description]
       * @return {Option} new option
       */
      createOption(flags, description) {
        return new Option2(flags, description);
      }
      /**
       * Add an option.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addOption(option) {
        const oname = option.name();
        const name = option.attributeName();
        if (option.negate) {
          const positiveLongFlag = option.long.replace(/^--no-/, "--");
          if (!this._findOption(positiveLongFlag)) {
            this.setOptionValueWithSource(name, option.defaultValue === void 0 ? true : option.defaultValue, "default");
          }
        } else if (option.defaultValue !== void 0) {
          this.setOptionValueWithSource(name, option.defaultValue, "default");
        }
        this.options.push(option);
        const handleOptionValue = (val, invalidValueMessage, valueSource) => {
          if (val == null && option.presetArg !== void 0) {
            val = option.presetArg;
          }
          const oldValue = this.getOptionValue(name);
          if (val !== null && option.parseArg) {
            try {
              val = option.parseArg(val, oldValue);
            } catch (err) {
              if (err.code === "commander.invalidArgument") {
                const message = `${invalidValueMessage} ${err.message}`;
                this.error(message, { exitCode: err.exitCode, code: err.code });
              }
              throw err;
            }
          } else if (val !== null && option.variadic) {
            val = option._concatValue(val, oldValue);
          }
          if (val == null) {
            if (option.negate) {
              val = false;
            } else if (option.isBoolean() || option.optional) {
              val = true;
            } else {
              val = "";
            }
          }
          this.setOptionValueWithSource(name, val, valueSource);
        };
        this.on("option:" + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, "cli");
        });
        if (option.envVar) {
          this.on("optionEnv:" + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "env");
          });
        }
        return this;
      }
      /**
       * Internal implementation shared by .option() and .requiredOption()
       *
       * @api private
       */
      _optionEx(config, flags, description, fn, defaultValue) {
        if (typeof flags === "object" && flags instanceof Option2) {
          throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");
        }
        const option = this.createOption(flags, description);
        option.makeOptionMandatory(!!config.mandatory);
        if (typeof fn === "function") {
          option.default(defaultValue).argParser(fn);
        } else if (fn instanceof RegExp) {
          const regex = fn;
          fn = (val, def) => {
            const m = regex.exec(val);
            return m ? m[0] : def;
          };
          option.default(defaultValue).argParser(fn);
        } else {
          option.default(fn);
        }
        return this.addOption(option);
      }
      /**
       * Define option with `flags`, `description` and optional
       * coercion `fn`.
       *
       * The `flags` string contains the short and/or long flags,
       * separated by comma, a pipe or space. The following are all valid
       * all will output this way when `--help` is used.
       *
       *     "-p, --pepper"
       *     "-p|--pepper"
       *     "-p --pepper"
       *
       * @example
       * // simple boolean defaulting to undefined
       * program.option('-p, --pepper', 'add pepper');
       *
       * program.pepper
       * // => undefined
       *
       * --pepper
       * program.pepper
       * // => true
       *
       * // simple boolean defaulting to true (unless non-negated option is also defined)
       * program.option('-C, --no-cheese', 'remove cheese');
       *
       * program.cheese
       * // => true
       *
       * --no-cheese
       * program.cheese
       * // => false
       *
       * // required argument
       * program.option('-C, --chdir <path>', 'change the working directory');
       *
       * --chdir /tmp
       * program.chdir
       * // => "/tmp"
       *
       * // optional argument
       * program.option('-c, --cheese [type]', 'add cheese [marble]');
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {Function|*} [fn] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      option(flags, description, fn, defaultValue) {
        return this._optionEx({}, flags, description, fn, defaultValue);
      }
      /**
      * Add a required option which must have a value after parsing. This usually means
      * the option must be specified on the command line. (Otherwise the same as .option().)
      *
      * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
      *
      * @param {string} flags
      * @param {string} [description]
      * @param {Function|*} [fn] - custom option processing function or default value
      * @param {*} [defaultValue]
      * @return {Command} `this` command for chaining
      */
      requiredOption(flags, description, fn, defaultValue) {
        return this._optionEx({ mandatory: true }, flags, description, fn, defaultValue);
      }
      /**
       * Alter parsing of short flags with optional values.
       *
       * @example
       * // for `.option('-f,--flag [value]'):
       * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
       * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
       *
       * @param {Boolean} [combine=true] - if `true` or omitted, an optional value can be specified directly after the flag.
       */
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine;
        return this;
      }
      /**
       * Allow unknown options on the command line.
       *
       * @param {Boolean} [allowUnknown=true] - if `true` or omitted, no error will be thrown
       * for unknown options.
       */
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown;
        return this;
      }
      /**
       * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
       *
       * @param {Boolean} [allowExcess=true] - if `true` or omitted, no error will be thrown
       * for excess arguments.
       */
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess;
        return this;
      }
      /**
       * Enable positional options. Positional means global options are specified before subcommands which lets
       * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
       * The default behaviour is non-positional and global options may appear anywhere on the command line.
       *
       * @param {Boolean} [positional=true]
       */
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional;
        return this;
      }
      /**
       * Pass through options that come after command-arguments rather than treat them as command-options,
       * so actual command-options come before command-arguments. Turning this on for a subcommand requires
       * positional options to have been enabled on the program (parent commands).
       * The default behaviour is non-positional and options may appear before or after command-arguments.
       *
       * @param {Boolean} [passThrough=true]
       * for unknown options.
       */
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough;
        if (!!this.parent && passThrough && !this.parent._enablePositionalOptions) {
          throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");
        }
        return this;
      }
      /**
        * Whether to store option values as properties on command object,
        * or store separately (specify false). In both cases the option values can be accessed using .opts().
        *
        * @param {boolean} [storeAsProperties=true]
        * @return {Command} `this` command for chaining
        */
      storeOptionsAsProperties(storeAsProperties = true) {
        this._storeOptionsAsProperties = !!storeAsProperties;
        if (this.options.length) {
          throw new Error("call .storeOptionsAsProperties() before adding options");
        }
        return this;
      }
      /**
       * Retrieve option value.
       *
       * @param {string} key
       * @return {Object} value
       */
      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key];
        }
        return this._optionValues[key];
      }
      /**
       * Store option value.
       *
       * @param {string} key
       * @param {Object} value
       * @return {Command} `this` command for chaining
       */
      setOptionValue(key, value) {
        return this.setOptionValueWithSource(key, value, void 0);
      }
      /**
        * Store option value and where the value came from.
        *
        * @param {string} key
        * @param {Object} value
        * @param {string} source - expected values are default/config/env/cli/implied
        * @return {Command} `this` command for chaining
        */
      setOptionValueWithSource(key, value, source) {
        if (this._storeOptionsAsProperties) {
          this[key] = value;
        } else {
          this._optionValues[key] = value;
        }
        this._optionValueSources[key] = source;
        return this;
      }
      /**
        * Get source of option value.
        * Expected values are default | config | env | cli | implied
        *
        * @param {string} key
        * @return {string}
        */
      getOptionValueSource(key) {
        return this._optionValueSources[key];
      }
      /**
        * Get source of option value. See also .optsWithGlobals().
        * Expected values are default | config | env | cli | implied
        *
        * @param {string} key
        * @return {string}
        */
      getOptionValueSourceWithGlobals(key) {
        let source;
        getCommandAndParents(this).forEach((cmd) => {
          if (cmd.getOptionValueSource(key) !== void 0) {
            source = cmd.getOptionValueSource(key);
          }
        });
        return source;
      }
      /**
       * Get user arguments from implied or explicit arguments.
       * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
       *
       * @api private
       */
      _prepareUserArgs(argv, parseOptions) {
        if (argv !== void 0 && !Array.isArray(argv)) {
          throw new Error("first parameter to parse must be array or undefined");
        }
        parseOptions = parseOptions || {};
        if (argv === void 0) {
          argv = process2.argv;
          if (process2.versions && process2.versions.electron) {
            parseOptions.from = "electron";
          }
        }
        this.rawArgs = argv.slice();
        let userArgs;
        switch (parseOptions.from) {
          case void 0:
          case "node":
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
            break;
          case "electron":
            if (process2.defaultApp) {
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
            } else {
              userArgs = argv.slice(1);
            }
            break;
          case "user":
            userArgs = argv.slice(0);
            break;
          default:
            throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`);
        }
        if (!this._name && this._scriptPath)
          this.nameFromFilename(this._scriptPath);
        this._name = this._name || "program";
        return userArgs;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * The default expectation is that the arguments are from node and have the application as argv[0]
       * and the script being run in argv[1], with user parameters after that.
       *
       * @example
       * program.parse(process.argv);
       * program.parse(); // implicitly use process.argv and auto-detect node vs electron conventions
       * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv] - optional, defaults to process.argv
       * @param {Object} [parseOptions] - optionally specify style of options with from: node/user/electron
       * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
       * @return {Command} `this` command for chaining
       */
      parse(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Use parseAsync instead of parse if any of your action handlers are async. Returns a Promise.
       *
       * The default expectation is that the arguments are from node and have the application as argv[0]
       * and the script being run in argv[1], with user parameters after that.
       *
       * @example
       * await program.parseAsync(process.argv);
       * await program.parseAsync(); // implicitly use process.argv and auto-detect node vs electron conventions
       * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv]
       * @param {Object} [parseOptions]
       * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
       * @return {Promise}
       */
      async parseAsync(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        await this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Execute a sub-command executable.
       *
       * @api private
       */
      _executeSubCommand(subcommand, args) {
        args = args.slice();
        let launchWithNode = false;
        const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
        function findFile(baseDir, baseName) {
          const localBin = path.resolve(baseDir, baseName);
          if (fs.existsSync(localBin))
            return localBin;
          if (sourceExt.includes(path.extname(baseName)))
            return void 0;
          const foundExt = sourceExt.find((ext) => fs.existsSync(`${localBin}${ext}`));
          if (foundExt)
            return `${localBin}${foundExt}`;
          return void 0;
        }
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
        let executableDir = this._executableDir || "";
        if (this._scriptPath) {
          let resolvedScriptPath;
          try {
            resolvedScriptPath = fs.realpathSync(this._scriptPath);
          } catch (err) {
            resolvedScriptPath = this._scriptPath;
          }
          executableDir = path.resolve(path.dirname(resolvedScriptPath), executableDir);
        }
        if (executableDir) {
          let localFile = findFile(executableDir, executableFile);
          if (!localFile && !subcommand._executableFile && this._scriptPath) {
            const legacyName = path.basename(this._scriptPath, path.extname(this._scriptPath));
            if (legacyName !== this._name) {
              localFile = findFile(executableDir, `${legacyName}-${subcommand._name}`);
            }
          }
          executableFile = localFile || executableFile;
        }
        launchWithNode = sourceExt.includes(path.extname(executableFile));
        let proc;
        if (process2.platform !== "win32") {
          if (launchWithNode) {
            args.unshift(executableFile);
            args = incrementNodeInspectorPort(process2.execArgv).concat(args);
            proc = childProcess.spawn(process2.argv[0], args, { stdio: "inherit" });
          } else {
            proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
          }
        } else {
          args.unshift(executableFile);
          args = incrementNodeInspectorPort(process2.execArgv).concat(args);
          proc = childProcess.spawn(process2.execPath, args, { stdio: "inherit" });
        }
        if (!proc.killed) {
          const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
          signals.forEach((signal) => {
            process2.on(signal, () => {
              if (proc.killed === false && proc.exitCode === null) {
                proc.kill(signal);
              }
            });
          });
        }
        const exitCallback = this._exitCallback;
        if (!exitCallback) {
          proc.on("close", process2.exit.bind(process2));
        } else {
          proc.on("close", () => {
            exitCallback(new CommanderError2(process2.exitCode || 0, "commander.executeSubCommandAsync", "(close)"));
          });
        }
        proc.on("error", (err) => {
          if (err.code === "ENOENT") {
            const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
            const executableMissing = `'${executableFile}' does not exist
 - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
            throw new Error(executableMissing);
          } else if (err.code === "EACCES") {
            throw new Error(`'${executableFile}' not executable`);
          }
          if (!exitCallback) {
            process2.exit(1);
          } else {
            const wrappedError = new CommanderError2(1, "commander.executeSubCommandAsync", "(error)");
            wrappedError.nestedError = err;
            exitCallback(wrappedError);
          }
        });
        this.runningCommand = proc;
      }
      /**
       * @api private
       */
      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName);
        if (!subCommand)
          this.help({ error: true });
        let hookResult;
        hookResult = this._chainOrCallSubCommandHook(hookResult, subCommand, "preSubcommand");
        hookResult = this._chainOrCall(hookResult, () => {
          if (subCommand._executableHandler) {
            this._executeSubCommand(subCommand, operands.concat(unknown));
          } else {
            return subCommand._parseCommand(operands, unknown);
          }
        });
        return hookResult;
      }
      /**
       * Check this.args against expected this._args.
       *
       * @api private
       */
      _checkNumberOfArguments() {
        this._args.forEach((arg, i) => {
          if (arg.required && this.args[i] == null) {
            this.missingArgument(arg.name());
          }
        });
        if (this._args.length > 0 && this._args[this._args.length - 1].variadic) {
          return;
        }
        if (this.args.length > this._args.length) {
          this._excessArguments(this.args);
        }
      }
      /**
       * Process this.args using this._args and save as this.processedArgs!
       *
       * @api private
       */
      _processArguments() {
        const myParseArg = (argument, value, previous) => {
          let parsedValue = value;
          if (value !== null && argument.parseArg) {
            try {
              parsedValue = argument.parseArg(value, previous);
            } catch (err) {
              if (err.code === "commander.invalidArgument") {
                const message = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'. ${err.message}`;
                this.error(message, { exitCode: err.exitCode, code: err.code });
              }
              throw err;
            }
          }
          return parsedValue;
        };
        this._checkNumberOfArguments();
        const processedArgs = [];
        this._args.forEach((declaredArg, index) => {
          let value = declaredArg.defaultValue;
          if (declaredArg.variadic) {
            if (index < this.args.length) {
              value = this.args.slice(index);
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed);
                }, declaredArg.defaultValue);
              }
            } else if (value === void 0) {
              value = [];
            }
          } else if (index < this.args.length) {
            value = this.args[index];
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue);
            }
          }
          processedArgs[index] = value;
        });
        this.processedArgs = processedArgs;
      }
      /**
       * Once we have a promise we chain, but call synchronously until then.
       *
       * @param {Promise|undefined} promise
       * @param {Function} fn
       * @return {Promise|undefined}
       * @api private
       */
      _chainOrCall(promise, fn) {
        if (promise && promise.then && typeof promise.then === "function") {
          return promise.then(() => fn());
        }
        return fn();
      }
      /**
       *
       * @param {Promise|undefined} promise
       * @param {string} event
       * @return {Promise|undefined}
       * @api private
       */
      _chainOrCallHooks(promise, event) {
        let result = promise;
        const hooks = [];
        getCommandAndParents(this).reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
          hookedCommand._lifeCycleHooks[event].forEach((callback) => {
            hooks.push({ hookedCommand, callback });
          });
        });
        if (event === "postAction") {
          hooks.reverse();
        }
        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this);
          });
        });
        return result;
      }
      /**
       *
       * @param {Promise|undefined} promise
       * @param {Command} subCommand
       * @param {string} event
       * @return {Promise|undefined}
       * @api private
       */
      _chainOrCallSubCommandHook(promise, subCommand, event) {
        let result = promise;
        if (this._lifeCycleHooks[event] !== void 0) {
          this._lifeCycleHooks[event].forEach((hook) => {
            result = this._chainOrCall(result, () => {
              return hook(this, subCommand);
            });
          });
        }
        return result;
      }
      /**
       * Process arguments in context of this command.
       * Returns action result, in case it is a promise.
       *
       * @api private
       */
      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown);
        this._parseOptionsEnv();
        this._parseOptionsImplied();
        operands = operands.concat(parsed.operands);
        unknown = parsed.unknown;
        this.args = operands.concat(unknown);
        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
        }
        if (this._hasImplicitHelpCommand() && operands[0] === this._helpCommandName) {
          if (operands.length === 1) {
            this.help();
          }
          return this._dispatchSubcommand(operands[1], [], [this._helpLongFlag]);
        }
        if (this._defaultCommandName) {
          outputHelpIfRequested(this, unknown);
          return this._dispatchSubcommand(this._defaultCommandName, operands, unknown);
        }
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          this.help({ error: true });
        }
        outputHelpIfRequested(this, parsed.unknown);
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        const checkForUnknownOptions = () => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0]);
          }
        };
        const commandEvent = `command:${this.name()}`;
        if (this._actionHandler) {
          checkForUnknownOptions();
          this._processArguments();
          let actionResult;
          actionResult = this._chainOrCallHooks(actionResult, "preAction");
          actionResult = this._chainOrCall(actionResult, () => this._actionHandler(this.processedArgs));
          if (this.parent) {
            actionResult = this._chainOrCall(actionResult, () => {
              this.parent.emit(commandEvent, operands, unknown);
            });
          }
          actionResult = this._chainOrCallHooks(actionResult, "postAction");
          return actionResult;
        }
        if (this.parent && this.parent.listenerCount(commandEvent)) {
          checkForUnknownOptions();
          this._processArguments();
          this.parent.emit(commandEvent, operands, unknown);
        } else if (operands.length) {
          if (this._findCommand("*")) {
            return this._dispatchSubcommand("*", operands, unknown);
          }
          if (this.listenerCount("command:*")) {
            this.emit("command:*", operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        } else if (this.commands.length) {
          checkForUnknownOptions();
          this.help({ error: true });
        } else {
          checkForUnknownOptions();
          this._processArguments();
        }
      }
      /**
       * Find matching command.
       *
       * @api private
       */
      _findCommand(name) {
        if (!name)
          return void 0;
        return this.commands.find((cmd) => cmd._name === name || cmd._aliases.includes(name));
      }
      /**
       * Return an option matching `arg` if any.
       *
       * @param {string} arg
       * @return {Option}
       * @api private
       */
      _findOption(arg) {
        return this.options.find((option) => option.is(arg));
      }
      /**
       * Display an error message if a mandatory option does not have a value.
       * Called after checking for help flags in leaf subcommand.
       *
       * @api private
       */
      _checkForMissingMandatoryOptions() {
        for (let cmd = this; cmd; cmd = cmd.parent) {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
              cmd.missingMandatoryOptionValue(anOption);
            }
          });
        }
      }
      /**
       * Display an error message if conflicting options are used together in this.
       *
       * @api private
       */
      _checkForConflictingLocalOptions() {
        const definedNonDefaultOptions = this.options.filter(
          (option) => {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0) {
              return false;
            }
            return this.getOptionValueSource(optionKey) !== "default";
          }
        );
        const optionsWithConflicting = definedNonDefaultOptions.filter(
          (option) => option.conflictsWith.length > 0
        );
        optionsWithConflicting.forEach((option) => {
          const conflictingAndDefined = definedNonDefaultOptions.find(
            (defined) => option.conflictsWith.includes(defined.attributeName())
          );
          if (conflictingAndDefined) {
            this._conflictingOption(option, conflictingAndDefined);
          }
        });
      }
      /**
       * Display an error message if conflicting options are used together.
       * Called after checking for help flags in leaf subcommand.
       *
       * @api private
       */
      _checkForConflictingOptions() {
        for (let cmd = this; cmd; cmd = cmd.parent) {
          cmd._checkForConflictingLocalOptions();
        }
      }
      /**
       * Parse options from `argv` removing known options,
       * and return argv split into operands and unknown arguments.
       *
       * Examples:
       *
       *     argv => operands, unknown
       *     --known kkk op => [op], []
       *     op --known kkk => [op], []
       *     sub --unknown uuu op => [sub], [--unknown uuu op]
       *     sub -- --unknown uuu op => [sub --unknown uuu op], []
       *
       * @param {String[]} argv
       * @return {{operands: String[], unknown: String[]}}
       */
      parseOptions(argv) {
        const operands = [];
        const unknown = [];
        let dest = operands;
        const args = argv.slice();
        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === "-";
        }
        let activeVariadicOption = null;
        while (args.length) {
          const arg = args.shift();
          if (arg === "--") {
            if (dest === unknown)
              dest.push(arg);
            dest.push(...args);
            break;
          }
          if (activeVariadicOption && !maybeOption(arg)) {
            this.emit(`option:${activeVariadicOption.name()}`, arg);
            continue;
          }
          activeVariadicOption = null;
          if (maybeOption(arg)) {
            const option = this._findOption(arg);
            if (option) {
              if (option.required) {
                const value = args.shift();
                if (value === void 0)
                  this.optionMissingArgument(option);
                this.emit(`option:${option.name()}`, value);
              } else if (option.optional) {
                let value = null;
                if (args.length > 0 && !maybeOption(args[0])) {
                  value = args.shift();
                }
                this.emit(`option:${option.name()}`, value);
              } else {
                this.emit(`option:${option.name()}`);
              }
              activeVariadicOption = option.variadic ? option : null;
              continue;
            }
          }
          if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
            const option = this._findOption(`-${arg[1]}`);
            if (option) {
              if (option.required || option.optional && this._combineFlagAndOptionalValue) {
                this.emit(`option:${option.name()}`, arg.slice(2));
              } else {
                this.emit(`option:${option.name()}`);
                args.unshift(`-${arg.slice(2)}`);
              }
              continue;
            }
          }
          if (/^--[^=]+=/.test(arg)) {
            const index = arg.indexOf("=");
            const option = this._findOption(arg.slice(0, index));
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index + 1));
              continue;
            }
          }
          if (maybeOption(arg)) {
            dest = unknown;
          }
          if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
            if (this._findCommand(arg)) {
              operands.push(arg);
              if (args.length > 0)
                unknown.push(...args);
              break;
            } else if (arg === this._helpCommandName && this._hasImplicitHelpCommand()) {
              operands.push(arg);
              if (args.length > 0)
                operands.push(...args);
              break;
            } else if (this._defaultCommandName) {
              unknown.push(arg);
              if (args.length > 0)
                unknown.push(...args);
              break;
            }
          }
          if (this._passThroughOptions) {
            dest.push(arg);
            if (args.length > 0)
              dest.push(...args);
            break;
          }
          dest.push(arg);
        }
        return { operands, unknown };
      }
      /**
       * Return an object containing local option values as key-value pairs.
       *
       * @return {Object}
       */
      opts() {
        if (this._storeOptionsAsProperties) {
          const result = {};
          const len = this.options.length;
          for (let i = 0; i < len; i++) {
            const key = this.options[i].attributeName();
            result[key] = key === this._versionOptionName ? this._version : this[key];
          }
          return result;
        }
        return this._optionValues;
      }
      /**
       * Return an object containing merged local and global option values as key-value pairs.
       *
       * @return {Object}
       */
      optsWithGlobals() {
        return getCommandAndParents(this).reduce(
          (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
          {}
        );
      }
      /**
       * Display error message and exit (or call exitOverride).
       *
       * @param {string} message
       * @param {Object} [errorOptions]
       * @param {string} [errorOptions.code] - an id string representing the error
       * @param {number} [errorOptions.exitCode] - used with process.exit
       */
      error(message, errorOptions) {
        this._outputConfiguration.outputError(`${message}
`, this._outputConfiguration.writeErr);
        if (typeof this._showHelpAfterError === "string") {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr("\n");
          this.outputHelp({ error: true });
        }
        const config = errorOptions || {};
        const exitCode = config.exitCode || 1;
        const code = config.code || "commander.error";
        this._exit(exitCode, code, message);
      }
      /**
       * Apply any option related environment variables, if option does
       * not have a value from cli or client code.
       *
       * @api private
       */
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process2.env) {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(this.getOptionValueSource(optionKey))) {
              if (option.required || option.optional) {
                this.emit(`optionEnv:${option.name()}`, process2.env[option.envVar]);
              } else {
                this.emit(`optionEnv:${option.name()}`);
              }
            }
          }
        });
      }
      /**
       * Apply any implied option values, if option is undefined or default value.
       *
       * @api private
       */
      _parseOptionsImplied() {
        const dualHelper = new DualOptions(this.options);
        const hasCustomOptionValue = (optionKey) => {
          return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
        };
        this.options.filter((option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(this.getOptionValue(option.attributeName()), option)).forEach((option) => {
          Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
            this.setOptionValueWithSource(impliedKey, option.implied[impliedKey], "implied");
          });
        });
      }
      /**
       * Argument `name` is missing.
       *
       * @param {string} name
       * @api private
       */
      missingArgument(name) {
        const message = `error: missing required argument '${name}'`;
        this.error(message, { code: "commander.missingArgument" });
      }
      /**
       * `Option` is missing an argument.
       *
       * @param {Option} option
       * @api private
       */
      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`;
        this.error(message, { code: "commander.optionMissingArgument" });
      }
      /**
       * `Option` does not have a value, and is a mandatory option.
       *
       * @param {Option} option
       * @api private
       */
      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`;
        this.error(message, { code: "commander.missingMandatoryOptionValue" });
      }
      /**
       * `Option` conflicts with another option.
       *
       * @param {Option} option
       * @param {Option} conflictingOption
       * @api private
       */
      _conflictingOption(option, conflictingOption) {
        const findBestOptionFromValue = (option2) => {
          const optionKey = option2.attributeName();
          const optionValue = this.getOptionValue(optionKey);
          const negativeOption = this.options.find((target) => target.negate && optionKey === target.attributeName());
          const positiveOption = this.options.find((target) => !target.negate && optionKey === target.attributeName());
          if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
            return negativeOption;
          }
          return positiveOption || option2;
        };
        const getErrorMessage = (option2) => {
          const bestOption = findBestOptionFromValue(option2);
          const optionKey = bestOption.attributeName();
          const source = this.getOptionValueSource(optionKey);
          if (source === "env") {
            return `environment variable '${bestOption.envVar}'`;
          }
          return `option '${bestOption.flags}'`;
        };
        const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
        this.error(message, { code: "commander.conflictingOption" });
      }
      /**
       * Unknown option `flag`.
       *
       * @param {string} flag
       * @api private
       */
      unknownOption(flag) {
        if (this._allowUnknownOption)
          return;
        let suggestion = "";
        if (flag.startsWith("--") && this._showSuggestionAfterError) {
          let candidateFlags = [];
          let command = this;
          do {
            const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
            candidateFlags = candidateFlags.concat(moreFlags);
            command = command.parent;
          } while (command && !command._enablePositionalOptions);
          suggestion = suggestSimilar(flag, candidateFlags);
        }
        const message = `error: unknown option '${flag}'${suggestion}`;
        this.error(message, { code: "commander.unknownOption" });
      }
      /**
       * Excess arguments, more than expected.
       *
       * @param {string[]} receivedArgs
       * @api private
       */
      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments)
          return;
        const expected = this._args.length;
        const s = expected === 1 ? "" : "s";
        const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
        this.error(message, { code: "commander.excessArguments" });
      }
      /**
       * Unknown command.
       *
       * @api private
       */
      unknownCommand() {
        const unknownName = this.args[0];
        let suggestion = "";
        if (this._showSuggestionAfterError) {
          const candidateNames = [];
          this.createHelp().visibleCommands(this).forEach((command) => {
            candidateNames.push(command.name());
            if (command.alias())
              candidateNames.push(command.alias());
          });
          suggestion = suggestSimilar(unknownName, candidateNames);
        }
        const message = `error: unknown command '${unknownName}'${suggestion}`;
        this.error(message, { code: "commander.unknownCommand" });
      }
      /**
       * Set the program version to `str`.
       *
       * This method auto-registers the "-V, --version" flag
       * which will print the version number when passed.
       *
       * You can optionally supply the  flags and description to override the defaults.
       *
       * @param {string} str
       * @param {string} [flags]
       * @param {string} [description]
       * @return {this | string} `this` command for chaining, or version string if no arguments
       */
      version(str, flags, description) {
        if (str === void 0)
          return this._version;
        this._version = str;
        flags = flags || "-V, --version";
        description = description || "output the version number";
        const versionOption = this.createOption(flags, description);
        this._versionOptionName = versionOption.attributeName();
        this.options.push(versionOption);
        this.on("option:" + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str}
`);
          this._exit(0, "commander.version", str);
        });
        return this;
      }
      /**
       * Set the description.
       *
       * @param {string} [str]
       * @param {Object} [argsDescription]
       * @return {string|Command}
       */
      description(str, argsDescription) {
        if (str === void 0 && argsDescription === void 0)
          return this._description;
        this._description = str;
        if (argsDescription) {
          this._argsDescription = argsDescription;
        }
        return this;
      }
      /**
       * Set the summary. Used when listed as subcommand of parent.
       *
       * @param {string} [str]
       * @return {string|Command}
       */
      summary(str) {
        if (str === void 0)
          return this._summary;
        this._summary = str;
        return this;
      }
      /**
       * Set an alias for the command.
       *
       * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
       *
       * @param {string} [alias]
       * @return {string|Command}
       */
      alias(alias) {
        if (alias === void 0)
          return this._aliases[0];
        let command = this;
        if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
          command = this.commands[this.commands.length - 1];
        }
        if (alias === command._name)
          throw new Error("Command alias can't be the same as its name");
        command._aliases.push(alias);
        return this;
      }
      /**
       * Set aliases for the command.
       *
       * Only the first alias is shown in the auto-generated help.
       *
       * @param {string[]} [aliases]
       * @return {string[]|Command}
       */
      aliases(aliases) {
        if (aliases === void 0)
          return this._aliases;
        aliases.forEach((alias) => this.alias(alias));
        return this;
      }
      /**
       * Set / get the command usage `str`.
       *
       * @param {string} [str]
       * @return {String|Command}
       */
      usage(str) {
        if (str === void 0) {
          if (this._usage)
            return this._usage;
          const args = this._args.map((arg) => {
            return humanReadableArgName(arg);
          });
          return [].concat(
            this.options.length || this._hasHelpOption ? "[options]" : [],
            this.commands.length ? "[command]" : [],
            this._args.length ? args : []
          ).join(" ");
        }
        this._usage = str;
        return this;
      }
      /**
       * Get or set the name of the command.
       *
       * @param {string} [str]
       * @return {string|Command}
       */
      name(str) {
        if (str === void 0)
          return this._name;
        this._name = str;
        return this;
      }
      /**
       * Set the name of the command from script filename, such as process.argv[1],
       * or require.main.filename, or __filename.
       *
       * (Used internally and public although not documented in README.)
       *
       * @example
       * program.nameFromFilename(require.main.filename);
       *
       * @param {string} filename
       * @return {Command}
       */
      nameFromFilename(filename) {
        this._name = path.basename(filename, path.extname(filename));
        return this;
      }
      /**
       * Get or set the directory for searching for executable subcommands of this command.
       *
       * @example
       * program.executableDir(__dirname);
       * // or
       * program.executableDir('subcommands');
       *
       * @param {string} [path]
       * @return {string|Command}
       */
      executableDir(path2) {
        if (path2 === void 0)
          return this._executableDir;
        this._executableDir = path2;
        return this;
      }
      /**
       * Return program help documentation.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
       * @return {string}
       */
      helpInformation(contextOptions) {
        const helper = this.createHelp();
        if (helper.helpWidth === void 0) {
          helper.helpWidth = contextOptions && contextOptions.error ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth();
        }
        return helper.formatHelp(this, helper);
      }
      /**
       * @api private
       */
      _getHelpContext(contextOptions) {
        contextOptions = contextOptions || {};
        const context = { error: !!contextOptions.error };
        let write;
        if (context.error) {
          write = (arg) => this._outputConfiguration.writeErr(arg);
        } else {
          write = (arg) => this._outputConfiguration.writeOut(arg);
        }
        context.write = contextOptions.write || write;
        context.command = this;
        return context;
      }
      /**
       * Output help information for this command.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      outputHelp(contextOptions) {
        let deprecatedCallback;
        if (typeof contextOptions === "function") {
          deprecatedCallback = contextOptions;
          contextOptions = void 0;
        }
        const context = this._getHelpContext(contextOptions);
        getCommandAndParents(this).reverse().forEach((command) => command.emit("beforeAllHelp", context));
        this.emit("beforeHelp", context);
        let helpInformation = this.helpInformation(context);
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation);
          if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
            throw new Error("outputHelp callback must return a string or a Buffer");
          }
        }
        context.write(helpInformation);
        this.emit(this._helpLongFlag);
        this.emit("afterHelp", context);
        getCommandAndParents(this).forEach((command) => command.emit("afterAllHelp", context));
      }
      /**
       * You can pass in flags and a description to override the help
       * flags and help description for your command. Pass in false to
       * disable the built-in help option.
       *
       * @param {string | boolean} [flags]
       * @param {string} [description]
       * @return {Command} `this` command for chaining
       */
      helpOption(flags, description) {
        if (typeof flags === "boolean") {
          this._hasHelpOption = flags;
          return this;
        }
        this._helpFlags = flags || this._helpFlags;
        this._helpDescription = description || this._helpDescription;
        const helpFlags = splitOptionFlags(this._helpFlags);
        this._helpShortFlag = helpFlags.shortFlag;
        this._helpLongFlag = helpFlags.longFlag;
        return this;
      }
      /**
       * Output help information and exit.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      help(contextOptions) {
        this.outputHelp(contextOptions);
        let exitCode = process2.exitCode || 0;
        if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
          exitCode = 1;
        }
        this._exit(exitCode, "commander.help", "(outputHelp)");
      }
      /**
       * Add additional text to be displayed with the built-in help.
       *
       * Position is 'before' or 'after' to affect just this command,
       * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
       *
       * @param {string} position - before or after built-in help
       * @param {string | Function} text - string to add, or a function returning a string
       * @return {Command} `this` command for chaining
       */
      addHelpText(position, text) {
        const allowedValues = ["beforeAll", "before", "after", "afterAll"];
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        const helpEvent = `${position}Help`;
        this.on(helpEvent, (context) => {
          let helpStr;
          if (typeof text === "function") {
            helpStr = text({ error: context.error, command: context.command });
          } else {
            helpStr = text;
          }
          if (helpStr) {
            context.write(`${helpStr}
`);
          }
        });
        return this;
      }
    };
    function outputHelpIfRequested(cmd, args) {
      const helpOption = cmd._hasHelpOption && args.find((arg) => arg === cmd._helpLongFlag || arg === cmd._helpShortFlag);
      if (helpOption) {
        cmd.outputHelp();
        cmd._exit(0, "commander.helpDisplayed", "(outputHelp)");
      }
    }
    function incrementNodeInspectorPort(args) {
      return args.map((arg) => {
        if (!arg.startsWith("--inspect")) {
          return arg;
        }
        let debugOption;
        let debugHost = "127.0.0.1";
        let debugPort = "9229";
        let match;
        if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          debugOption = match[1];
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match[1];
          if (/^\d+$/.test(match[3])) {
            debugPort = match[3];
          } else {
            debugHost = match[3];
          }
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          debugOption = match[1];
          debugHost = match[3];
          debugPort = match[4];
        }
        if (debugOption && debugPort !== "0") {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
        }
        return arg;
      });
    }
    function getCommandAndParents(startCommand) {
      const result = [];
      for (let command = startCommand; command; command = command.parent) {
        result.push(command);
      }
      return result;
    }
    exports2.Command = Command2;
  }
});

// node_modules/commander/index.js
var require_commander = __commonJS({
  "node_modules/commander/index.js"(exports2, module2) {
    var { Argument: Argument2 } = require_argument();
    var { Command: Command2 } = require_command();
    var { CommanderError: CommanderError2, InvalidArgumentError: InvalidArgumentError2 } = require_error();
    var { Help: Help2 } = require_help();
    var { Option: Option2 } = require_option();
    exports2 = module2.exports = new Command2();
    exports2.program = exports2;
    exports2.Argument = Argument2;
    exports2.Command = Command2;
    exports2.CommanderError = CommanderError2;
    exports2.Help = Help2;
    exports2.InvalidArgumentError = InvalidArgumentError2;
    exports2.InvalidOptionArgumentError = InvalidArgumentError2;
    exports2.Option = Option2;
  }
});

// ../uma-tools/node_modules/immutable/dist/immutable.js
var require_immutable = __commonJS({
  "../uma-tools/node_modules/immutable/dist/immutable.js"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.Immutable = {}));
    })(exports2, function(exports3) {
      "use strict";
      var DELETE = "delete";
      var SHIFT = 5;
      var SIZE = 1 << SHIFT;
      var MASK = SIZE - 1;
      var NOT_SET = {};
      function MakeRef() {
        return { value: false };
      }
      function SetRef(ref) {
        if (ref) {
          ref.value = true;
        }
      }
      function OwnerID() {
      }
      function ensureSize(iter) {
        if (iter.size === void 0) {
          iter.size = iter.__iterate(returnTrue);
        }
        return iter.size;
      }
      function wrapIndex(iter, index) {
        if (typeof index !== "number") {
          var uint32Index = index >>> 0;
          if ("" + uint32Index !== index || uint32Index === 4294967295) {
            return NaN;
          }
          index = uint32Index;
        }
        return index < 0 ? ensureSize(iter) + index : index;
      }
      function returnTrue() {
        return true;
      }
      function wholeSlice(begin, end, size) {
        return (begin === 0 && !isNeg(begin) || size !== void 0 && begin <= -size) && (end === void 0 || size !== void 0 && end >= size);
      }
      function resolveBegin(begin, size) {
        return resolveIndex(begin, size, 0);
      }
      function resolveEnd(end, size) {
        return resolveIndex(end, size, size);
      }
      function resolveIndex(index, size, defaultIndex) {
        return index === void 0 ? defaultIndex : isNeg(index) ? size === Infinity ? size : Math.max(0, size + index) | 0 : size === void 0 || size === index ? index : Math.min(size, index) | 0;
      }
      function isNeg(value) {
        return value < 0 || value === 0 && 1 / value === -Infinity;
      }
      var IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
      function isCollection(maybeCollection) {
        return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
      }
      var IS_KEYED_SYMBOL = "@@__IMMUTABLE_KEYED__@@";
      function isKeyed(maybeKeyed) {
        return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
      }
      var IS_INDEXED_SYMBOL = "@@__IMMUTABLE_INDEXED__@@";
      function isIndexed(maybeIndexed) {
        return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
      }
      function isAssociative(maybeAssociative) {
        return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
      }
      var Collection = function Collection2(value) {
        return isCollection(value) ? value : Seq(value);
      };
      var KeyedCollection = /* @__PURE__ */ function(Collection2) {
        function KeyedCollection2(value) {
          return isKeyed(value) ? value : KeyedSeq(value);
        }
        if (Collection2)
          KeyedCollection2.__proto__ = Collection2;
        KeyedCollection2.prototype = Object.create(Collection2 && Collection2.prototype);
        KeyedCollection2.prototype.constructor = KeyedCollection2;
        return KeyedCollection2;
      }(Collection);
      var IndexedCollection = /* @__PURE__ */ function(Collection2) {
        function IndexedCollection2(value) {
          return isIndexed(value) ? value : IndexedSeq(value);
        }
        if (Collection2)
          IndexedCollection2.__proto__ = Collection2;
        IndexedCollection2.prototype = Object.create(Collection2 && Collection2.prototype);
        IndexedCollection2.prototype.constructor = IndexedCollection2;
        return IndexedCollection2;
      }(Collection);
      var SetCollection = /* @__PURE__ */ function(Collection2) {
        function SetCollection2(value) {
          return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
        }
        if (Collection2)
          SetCollection2.__proto__ = Collection2;
        SetCollection2.prototype = Object.create(Collection2 && Collection2.prototype);
        SetCollection2.prototype.constructor = SetCollection2;
        return SetCollection2;
      }(Collection);
      Collection.Keyed = KeyedCollection;
      Collection.Indexed = IndexedCollection;
      Collection.Set = SetCollection;
      var IS_SEQ_SYMBOL = "@@__IMMUTABLE_SEQ__@@";
      function isSeq(maybeSeq) {
        return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
      }
      var IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
      function isRecord(maybeRecord) {
        return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
      }
      function isImmutable(maybeImmutable) {
        return isCollection(maybeImmutable) || isRecord(maybeImmutable);
      }
      var IS_ORDERED_SYMBOL = "@@__IMMUTABLE_ORDERED__@@";
      function isOrdered(maybeOrdered) {
        return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
      }
      var ITERATE_KEYS = 0;
      var ITERATE_VALUES = 1;
      var ITERATE_ENTRIES = 2;
      var REAL_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;
      var Iterator = function Iterator2(next) {
        this.next = next;
      };
      Iterator.prototype.toString = function toString2() {
        return "[Iterator]";
      };
      Iterator.KEYS = ITERATE_KEYS;
      Iterator.VALUES = ITERATE_VALUES;
      Iterator.ENTRIES = ITERATE_ENTRIES;
      Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
        return this.toString();
      };
      Iterator.prototype[ITERATOR_SYMBOL] = function() {
        return this;
      };
      function iteratorValue(type, k, v, iteratorResult) {
        var value = type === 0 ? k : type === 1 ? v : [k, v];
        iteratorResult ? iteratorResult.value = value : iteratorResult = {
          value,
          done: false
        };
        return iteratorResult;
      }
      function iteratorDone() {
        return { value: void 0, done: true };
      }
      function hasIterator(maybeIterable) {
        if (Array.isArray(maybeIterable)) {
          return true;
        }
        return !!getIteratorFn(maybeIterable);
      }
      function isIterator(maybeIterator) {
        return maybeIterator && typeof maybeIterator.next === "function";
      }
      function getIterator(iterable) {
        var iteratorFn = getIteratorFn(iterable);
        return iteratorFn && iteratorFn.call(iterable);
      }
      function getIteratorFn(iterable) {
        var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      function isEntriesIterable(maybeIterable) {
        var iteratorFn = getIteratorFn(maybeIterable);
        return iteratorFn && iteratorFn === maybeIterable.entries;
      }
      function isKeysIterable(maybeIterable) {
        var iteratorFn = getIteratorFn(maybeIterable);
        return iteratorFn && iteratorFn === maybeIterable.keys;
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function isArrayLike(value) {
        if (Array.isArray(value) || typeof value === "string") {
          return true;
        }
        return value && typeof value === "object" && Number.isInteger(value.length) && value.length >= 0 && (value.length === 0 ? (
          // Only {length: 0} is considered Array-like.
          Object.keys(value).length === 1
        ) : (
          // An object is only Array-like if it has a property where the last value
          // in the array-like may be found (which could be undefined).
          value.hasOwnProperty(value.length - 1)
        ));
      }
      var Seq = /* @__PURE__ */ function(Collection2) {
        function Seq2(value) {
          return value === void 0 || value === null ? emptySequence() : isImmutable(value) ? value.toSeq() : seqFromValue(value);
        }
        if (Collection2)
          Seq2.__proto__ = Collection2;
        Seq2.prototype = Object.create(Collection2 && Collection2.prototype);
        Seq2.prototype.constructor = Seq2;
        Seq2.prototype.toSeq = function toSeq() {
          return this;
        };
        Seq2.prototype.toString = function toString2() {
          return this.__toString("Seq {", "}");
        };
        Seq2.prototype.cacheResult = function cacheResult() {
          if (!this._cache && this.__iterateUncached) {
            this._cache = this.entrySeq().toArray();
            this.size = this._cache.length;
          }
          return this;
        };
        Seq2.prototype.__iterate = function __iterate(fn, reverse) {
          var cache = this._cache;
          if (cache) {
            var size = cache.length;
            var i = 0;
            while (i !== size) {
              var entry = cache[reverse ? size - ++i : i++];
              if (fn(entry[1], entry[0], this) === false) {
                break;
              }
            }
            return i;
          }
          return this.__iterateUncached(fn, reverse);
        };
        Seq2.prototype.__iterator = function __iterator(type, reverse) {
          var cache = this._cache;
          if (cache) {
            var size = cache.length;
            var i = 0;
            return new Iterator(function() {
              if (i === size) {
                return iteratorDone();
              }
              var entry = cache[reverse ? size - ++i : i++];
              return iteratorValue(type, entry[0], entry[1]);
            });
          }
          return this.__iteratorUncached(type, reverse);
        };
        return Seq2;
      }(Collection);
      var KeyedSeq = /* @__PURE__ */ function(Seq2) {
        function KeyedSeq2(value) {
          return value === void 0 || value === null ? emptySequence().toKeyedSeq() : isCollection(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : isRecord(value) ? value.toSeq() : keyedSeqFromValue(value);
        }
        if (Seq2)
          KeyedSeq2.__proto__ = Seq2;
        KeyedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
        KeyedSeq2.prototype.constructor = KeyedSeq2;
        KeyedSeq2.prototype.toKeyedSeq = function toKeyedSeq() {
          return this;
        };
        return KeyedSeq2;
      }(Seq);
      var IndexedSeq = /* @__PURE__ */ function(Seq2) {
        function IndexedSeq2(value) {
          return value === void 0 || value === null ? emptySequence() : isCollection(value) ? isKeyed(value) ? value.entrySeq() : value.toIndexedSeq() : isRecord(value) ? value.toSeq().entrySeq() : indexedSeqFromValue(value);
        }
        if (Seq2)
          IndexedSeq2.__proto__ = Seq2;
        IndexedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
        IndexedSeq2.prototype.constructor = IndexedSeq2;
        IndexedSeq2.of = function of() {
          return IndexedSeq2(arguments);
        };
        IndexedSeq2.prototype.toIndexedSeq = function toIndexedSeq() {
          return this;
        };
        IndexedSeq2.prototype.toString = function toString2() {
          return this.__toString("Seq [", "]");
        };
        return IndexedSeq2;
      }(Seq);
      var SetSeq = /* @__PURE__ */ function(Seq2) {
        function SetSeq2(value) {
          return (isCollection(value) && !isAssociative(value) ? value : IndexedSeq(value)).toSetSeq();
        }
        if (Seq2)
          SetSeq2.__proto__ = Seq2;
        SetSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
        SetSeq2.prototype.constructor = SetSeq2;
        SetSeq2.of = function of() {
          return SetSeq2(arguments);
        };
        SetSeq2.prototype.toSetSeq = function toSetSeq() {
          return this;
        };
        return SetSeq2;
      }(Seq);
      Seq.isSeq = isSeq;
      Seq.Keyed = KeyedSeq;
      Seq.Set = SetSeq;
      Seq.Indexed = IndexedSeq;
      Seq.prototype[IS_SEQ_SYMBOL] = true;
      var ArraySeq = /* @__PURE__ */ function(IndexedSeq2) {
        function ArraySeq2(array) {
          this._array = array;
          this.size = array.length;
        }
        if (IndexedSeq2)
          ArraySeq2.__proto__ = IndexedSeq2;
        ArraySeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
        ArraySeq2.prototype.constructor = ArraySeq2;
        ArraySeq2.prototype.get = function get2(index, notSetValue) {
          return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
        };
        ArraySeq2.prototype.__iterate = function __iterate(fn, reverse) {
          var array = this._array;
          var size = array.length;
          var i = 0;
          while (i !== size) {
            var ii = reverse ? size - ++i : i++;
            if (fn(array[ii], ii, this) === false) {
              break;
            }
          }
          return i;
        };
        ArraySeq2.prototype.__iterator = function __iterator(type, reverse) {
          var array = this._array;
          var size = array.length;
          var i = 0;
          return new Iterator(function() {
            if (i === size) {
              return iteratorDone();
            }
            var ii = reverse ? size - ++i : i++;
            return iteratorValue(type, ii, array[ii]);
          });
        };
        return ArraySeq2;
      }(IndexedSeq);
      var ObjectSeq = /* @__PURE__ */ function(KeyedSeq2) {
        function ObjectSeq2(object) {
          var keys = Object.keys(object).concat(
            Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : []
          );
          this._object = object;
          this._keys = keys;
          this.size = keys.length;
        }
        if (KeyedSeq2)
          ObjectSeq2.__proto__ = KeyedSeq2;
        ObjectSeq2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
        ObjectSeq2.prototype.constructor = ObjectSeq2;
        ObjectSeq2.prototype.get = function get2(key, notSetValue) {
          if (notSetValue !== void 0 && !this.has(key)) {
            return notSetValue;
          }
          return this._object[key];
        };
        ObjectSeq2.prototype.has = function has2(key) {
          return hasOwnProperty.call(this._object, key);
        };
        ObjectSeq2.prototype.__iterate = function __iterate(fn, reverse) {
          var object = this._object;
          var keys = this._keys;
          var size = keys.length;
          var i = 0;
          while (i !== size) {
            var key = keys[reverse ? size - ++i : i++];
            if (fn(object[key], key, this) === false) {
              break;
            }
          }
          return i;
        };
        ObjectSeq2.prototype.__iterator = function __iterator(type, reverse) {
          var object = this._object;
          var keys = this._keys;
          var size = keys.length;
          var i = 0;
          return new Iterator(function() {
            if (i === size) {
              return iteratorDone();
            }
            var key = keys[reverse ? size - ++i : i++];
            return iteratorValue(type, key, object[key]);
          });
        };
        return ObjectSeq2;
      }(KeyedSeq);
      ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;
      var CollectionSeq = /* @__PURE__ */ function(IndexedSeq2) {
        function CollectionSeq2(collection) {
          this._collection = collection;
          this.size = collection.length || collection.size;
        }
        if (IndexedSeq2)
          CollectionSeq2.__proto__ = IndexedSeq2;
        CollectionSeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
        CollectionSeq2.prototype.constructor = CollectionSeq2;
        CollectionSeq2.prototype.__iterateUncached = function __iterateUncached(fn, reverse) {
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var collection = this._collection;
          var iterator = getIterator(collection);
          var iterations = 0;
          if (isIterator(iterator)) {
            var step;
            while (!(step = iterator.next()).done) {
              if (fn(step.value, iterations++, this) === false) {
                break;
              }
            }
          }
          return iterations;
        };
        CollectionSeq2.prototype.__iteratorUncached = function __iteratorUncached(type, reverse) {
          if (reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          var collection = this._collection;
          var iterator = getIterator(collection);
          if (!isIterator(iterator)) {
            return new Iterator(iteratorDone);
          }
          var iterations = 0;
          return new Iterator(function() {
            var step = iterator.next();
            return step.done ? step : iteratorValue(type, iterations++, step.value);
          });
        };
        return CollectionSeq2;
      }(IndexedSeq);
      var EMPTY_SEQ;
      function emptySequence() {
        return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
      }
      function keyedSeqFromValue(value) {
        var seq = maybeIndexedSeqFromValue(value);
        if (seq) {
          return seq.fromEntrySeq();
        }
        if (typeof value === "object") {
          return new ObjectSeq(value);
        }
        throw new TypeError(
          "Expected Array or collection object of [k, v] entries, or keyed object: " + value
        );
      }
      function indexedSeqFromValue(value) {
        var seq = maybeIndexedSeqFromValue(value);
        if (seq) {
          return seq;
        }
        throw new TypeError(
          "Expected Array or collection object of values: " + value
        );
      }
      function seqFromValue(value) {
        var seq = maybeIndexedSeqFromValue(value);
        if (seq) {
          return isEntriesIterable(value) ? seq.fromEntrySeq() : isKeysIterable(value) ? seq.toSetSeq() : seq;
        }
        if (typeof value === "object") {
          return new ObjectSeq(value);
        }
        throw new TypeError(
          "Expected Array or collection object of values, or keyed object: " + value
        );
      }
      function maybeIndexedSeqFromValue(value) {
        return isArrayLike(value) ? new ArraySeq(value) : hasIterator(value) ? new CollectionSeq(value) : void 0;
      }
      var IS_MAP_SYMBOL = "@@__IMMUTABLE_MAP__@@";
      function isMap(maybeMap) {
        return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
      }
      function isOrderedMap(maybeOrderedMap) {
        return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
      }
      function isValueObject(maybeValue) {
        return Boolean(
          maybeValue && typeof maybeValue.equals === "function" && typeof maybeValue.hashCode === "function"
        );
      }
      function is(valueA, valueB) {
        if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
          return true;
        }
        if (!valueA || !valueB) {
          return false;
        }
        if (typeof valueA.valueOf === "function" && typeof valueB.valueOf === "function") {
          valueA = valueA.valueOf();
          valueB = valueB.valueOf();
          if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
            return true;
          }
          if (!valueA || !valueB) {
            return false;
          }
        }
        return !!(isValueObject(valueA) && isValueObject(valueB) && valueA.equals(valueB));
      }
      var imul = typeof Math.imul === "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : function imul2(a, b) {
        a |= 0;
        b |= 0;
        var c = a & 65535;
        var d = b & 65535;
        return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0;
      };
      function smi(i32) {
        return i32 >>> 1 & 1073741824 | i32 & 3221225471;
      }
      var defaultValueOf = Object.prototype.valueOf;
      function hash(o) {
        if (o == null) {
          return hashNullish(o);
        }
        if (typeof o.hashCode === "function") {
          return smi(o.hashCode(o));
        }
        var v = valueOf(o);
        if (v == null) {
          return hashNullish(v);
        }
        switch (typeof v) {
          case "boolean":
            return v ? 1108378657 : 1108378656;
          case "number":
            return hashNumber(v);
          case "string":
            return v.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(v) : hashString(v);
          case "object":
          case "function":
            return hashJSObj(v);
          case "symbol":
            return hashSymbol(v);
          default:
            if (typeof v.toString === "function") {
              return hashString(v.toString());
            }
            throw new Error("Value type " + typeof v + " cannot be hashed.");
        }
      }
      function hashNullish(nullish) {
        return nullish === null ? 1108378658 : (
          /* undefined */
          1108378659
        );
      }
      function hashNumber(n) {
        if (n !== n || n === Infinity) {
          return 0;
        }
        var hash2 = n | 0;
        if (hash2 !== n) {
          hash2 ^= n * 4294967295;
        }
        while (n > 4294967295) {
          n /= 4294967295;
          hash2 ^= n;
        }
        return smi(hash2);
      }
      function cachedHashString(string) {
        var hashed = stringHashCache[string];
        if (hashed === void 0) {
          hashed = hashString(string);
          if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
            STRING_HASH_CACHE_SIZE = 0;
            stringHashCache = {};
          }
          STRING_HASH_CACHE_SIZE++;
          stringHashCache[string] = hashed;
        }
        return hashed;
      }
      function hashString(string) {
        var hashed = 0;
        for (var ii = 0; ii < string.length; ii++) {
          hashed = 31 * hashed + string.charCodeAt(ii) | 0;
        }
        return smi(hashed);
      }
      function hashSymbol(sym) {
        var hashed = symbolMap[sym];
        if (hashed !== void 0) {
          return hashed;
        }
        hashed = nextHash();
        symbolMap[sym] = hashed;
        return hashed;
      }
      function hashJSObj(obj) {
        var hashed;
        if (usingWeakMap) {
          hashed = weakMap.get(obj);
          if (hashed !== void 0) {
            return hashed;
          }
        }
        hashed = obj[UID_HASH_KEY];
        if (hashed !== void 0) {
          return hashed;
        }
        if (!canDefineProperty) {
          hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
          if (hashed !== void 0) {
            return hashed;
          }
          hashed = getIENodeHash(obj);
          if (hashed !== void 0) {
            return hashed;
          }
        }
        hashed = nextHash();
        if (usingWeakMap) {
          weakMap.set(obj, hashed);
        } else if (isExtensible !== void 0 && isExtensible(obj) === false) {
          throw new Error("Non-extensible objects are not allowed as keys.");
        } else if (canDefineProperty) {
          Object.defineProperty(obj, UID_HASH_KEY, {
            enumerable: false,
            configurable: false,
            writable: false,
            value: hashed
          });
        } else if (obj.propertyIsEnumerable !== void 0 && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
          obj.propertyIsEnumerable = function() {
            return this.constructor.prototype.propertyIsEnumerable.apply(
              this,
              arguments
            );
          };
          obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
        } else if (obj.nodeType !== void 0) {
          obj[UID_HASH_KEY] = hashed;
        } else {
          throw new Error("Unable to set a non-enumerable property on object.");
        }
        return hashed;
      }
      var isExtensible = Object.isExtensible;
      var canDefineProperty = function() {
        try {
          Object.defineProperty({}, "@", {});
          return true;
        } catch (e) {
          return false;
        }
      }();
      function getIENodeHash(node) {
        if (node && node.nodeType > 0) {
          switch (node.nodeType) {
            case 1:
              return node.uniqueID;
            case 9:
              return node.documentElement && node.documentElement.uniqueID;
          }
        }
      }
      function valueOf(obj) {
        return obj.valueOf !== defaultValueOf && typeof obj.valueOf === "function" ? obj.valueOf(obj) : obj;
      }
      function nextHash() {
        var nextHash2 = ++_objHashUID;
        if (_objHashUID & 1073741824) {
          _objHashUID = 0;
        }
        return nextHash2;
      }
      var usingWeakMap = typeof WeakMap === "function";
      var weakMap;
      if (usingWeakMap) {
        weakMap = /* @__PURE__ */ new WeakMap();
      }
      var symbolMap = /* @__PURE__ */ Object.create(null);
      var _objHashUID = 0;
      var UID_HASH_KEY = "__immutablehash__";
      if (typeof Symbol === "function") {
        UID_HASH_KEY = Symbol(UID_HASH_KEY);
      }
      var STRING_HASH_CACHE_MIN_STRLEN = 16;
      var STRING_HASH_CACHE_MAX_SIZE = 255;
      var STRING_HASH_CACHE_SIZE = 0;
      var stringHashCache = {};
      var ToKeyedSequence = /* @__PURE__ */ function(KeyedSeq2) {
        function ToKeyedSequence2(indexed, useKeys) {
          this._iter = indexed;
          this._useKeys = useKeys;
          this.size = indexed.size;
        }
        if (KeyedSeq2)
          ToKeyedSequence2.__proto__ = KeyedSeq2;
        ToKeyedSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
        ToKeyedSequence2.prototype.constructor = ToKeyedSequence2;
        ToKeyedSequence2.prototype.get = function get2(key, notSetValue) {
          return this._iter.get(key, notSetValue);
        };
        ToKeyedSequence2.prototype.has = function has2(key) {
          return this._iter.has(key);
        };
        ToKeyedSequence2.prototype.valueSeq = function valueSeq() {
          return this._iter.valueSeq();
        };
        ToKeyedSequence2.prototype.reverse = function reverse() {
          var this$1$1 = this;
          var reversedSequence = reverseFactory(this, true);
          if (!this._useKeys) {
            reversedSequence.valueSeq = function() {
              return this$1$1._iter.toSeq().reverse();
            };
          }
          return reversedSequence;
        };
        ToKeyedSequence2.prototype.map = function map(mapper, context) {
          var this$1$1 = this;
          var mappedSequence = mapFactory(this, mapper, context);
          if (!this._useKeys) {
            mappedSequence.valueSeq = function() {
              return this$1$1._iter.toSeq().map(mapper, context);
            };
          }
          return mappedSequence;
        };
        ToKeyedSequence2.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          return this._iter.__iterate(function(v, k) {
            return fn(v, k, this$1$1);
          }, reverse);
        };
        ToKeyedSequence2.prototype.__iterator = function __iterator(type, reverse) {
          return this._iter.__iterator(type, reverse);
        };
        return ToKeyedSequence2;
      }(KeyedSeq);
      ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;
      var ToIndexedSequence = /* @__PURE__ */ function(IndexedSeq2) {
        function ToIndexedSequence2(iter) {
          this._iter = iter;
          this.size = iter.size;
        }
        if (IndexedSeq2)
          ToIndexedSequence2.__proto__ = IndexedSeq2;
        ToIndexedSequence2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
        ToIndexedSequence2.prototype.constructor = ToIndexedSequence2;
        ToIndexedSequence2.prototype.includes = function includes(value) {
          return this._iter.includes(value);
        };
        ToIndexedSequence2.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          var i = 0;
          reverse && ensureSize(this);
          return this._iter.__iterate(
            function(v) {
              return fn(v, reverse ? this$1$1.size - ++i : i++, this$1$1);
            },
            reverse
          );
        };
        ToIndexedSequence2.prototype.__iterator = function __iterator(type, reverse) {
          var this$1$1 = this;
          var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
          var i = 0;
          reverse && ensureSize(this);
          return new Iterator(function() {
            var step = iterator.next();
            return step.done ? step : iteratorValue(
              type,
              reverse ? this$1$1.size - ++i : i++,
              step.value,
              step
            );
          });
        };
        return ToIndexedSequence2;
      }(IndexedSeq);
      var ToSetSequence = /* @__PURE__ */ function(SetSeq2) {
        function ToSetSequence2(iter) {
          this._iter = iter;
          this.size = iter.size;
        }
        if (SetSeq2)
          ToSetSequence2.__proto__ = SetSeq2;
        ToSetSequence2.prototype = Object.create(SetSeq2 && SetSeq2.prototype);
        ToSetSequence2.prototype.constructor = ToSetSequence2;
        ToSetSequence2.prototype.has = function has2(key) {
          return this._iter.includes(key);
        };
        ToSetSequence2.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          return this._iter.__iterate(function(v) {
            return fn(v, v, this$1$1);
          }, reverse);
        };
        ToSetSequence2.prototype.__iterator = function __iterator(type, reverse) {
          var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
          return new Iterator(function() {
            var step = iterator.next();
            return step.done ? step : iteratorValue(type, step.value, step.value, step);
          });
        };
        return ToSetSequence2;
      }(SetSeq);
      var FromEntriesSequence = /* @__PURE__ */ function(KeyedSeq2) {
        function FromEntriesSequence2(entries) {
          this._iter = entries;
          this.size = entries.size;
        }
        if (KeyedSeq2)
          FromEntriesSequence2.__proto__ = KeyedSeq2;
        FromEntriesSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
        FromEntriesSequence2.prototype.constructor = FromEntriesSequence2;
        FromEntriesSequence2.prototype.entrySeq = function entrySeq() {
          return this._iter.toSeq();
        };
        FromEntriesSequence2.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          return this._iter.__iterate(function(entry) {
            if (entry) {
              validateEntry(entry);
              var indexedCollection = isCollection(entry);
              return fn(
                indexedCollection ? entry.get(1) : entry[1],
                indexedCollection ? entry.get(0) : entry[0],
                this$1$1
              );
            }
          }, reverse);
        };
        FromEntriesSequence2.prototype.__iterator = function __iterator(type, reverse) {
          var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
          return new Iterator(function() {
            while (true) {
              var step = iterator.next();
              if (step.done) {
                return step;
              }
              var entry = step.value;
              if (entry) {
                validateEntry(entry);
                var indexedCollection = isCollection(entry);
                return iteratorValue(
                  type,
                  indexedCollection ? entry.get(0) : entry[0],
                  indexedCollection ? entry.get(1) : entry[1],
                  step
                );
              }
            }
          });
        };
        return FromEntriesSequence2;
      }(KeyedSeq);
      ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;
      function flipFactory(collection) {
        var flipSequence = makeSequence(collection);
        flipSequence._iter = collection;
        flipSequence.size = collection.size;
        flipSequence.flip = function() {
          return collection;
        };
        flipSequence.reverse = function() {
          var reversedSequence = collection.reverse.apply(this);
          reversedSequence.flip = function() {
            return collection.reverse();
          };
          return reversedSequence;
        };
        flipSequence.has = function(key) {
          return collection.includes(key);
        };
        flipSequence.includes = function(key) {
          return collection.has(key);
        };
        flipSequence.cacheResult = cacheResultThrough;
        flipSequence.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          return collection.__iterate(function(v, k) {
            return fn(k, v, this$1$1) !== false;
          }, reverse);
        };
        flipSequence.__iteratorUncached = function(type, reverse) {
          if (type === ITERATE_ENTRIES) {
            var iterator = collection.__iterator(type, reverse);
            return new Iterator(function() {
              var step = iterator.next();
              if (!step.done) {
                var k = step.value[0];
                step.value[0] = step.value[1];
                step.value[1] = k;
              }
              return step;
            });
          }
          return collection.__iterator(
            type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
            reverse
          );
        };
        return flipSequence;
      }
      function mapFactory(collection, mapper, context) {
        var mappedSequence = makeSequence(collection);
        mappedSequence.size = collection.size;
        mappedSequence.has = function(key) {
          return collection.has(key);
        };
        mappedSequence.get = function(key, notSetValue) {
          var v = collection.get(key, NOT_SET);
          return v === NOT_SET ? notSetValue : mapper.call(context, v, key, collection);
        };
        mappedSequence.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          return collection.__iterate(
            function(v, k, c) {
              return fn(mapper.call(context, v, k, c), k, this$1$1) !== false;
            },
            reverse
          );
        };
        mappedSequence.__iteratorUncached = function(type, reverse) {
          var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
          return new Iterator(function() {
            var step = iterator.next();
            if (step.done) {
              return step;
            }
            var entry = step.value;
            var key = entry[0];
            return iteratorValue(
              type,
              key,
              mapper.call(context, entry[1], key, collection),
              step
            );
          });
        };
        return mappedSequence;
      }
      function reverseFactory(collection, useKeys) {
        var this$1$1 = this;
        var reversedSequence = makeSequence(collection);
        reversedSequence._iter = collection;
        reversedSequence.size = collection.size;
        reversedSequence.reverse = function() {
          return collection;
        };
        if (collection.flip) {
          reversedSequence.flip = function() {
            var flipSequence = flipFactory(collection);
            flipSequence.reverse = function() {
              return collection.flip();
            };
            return flipSequence;
          };
        }
        reversedSequence.get = function(key, notSetValue) {
          return collection.get(useKeys ? key : -1 - key, notSetValue);
        };
        reversedSequence.has = function(key) {
          return collection.has(useKeys ? key : -1 - key);
        };
        reversedSequence.includes = function(value) {
          return collection.includes(value);
        };
        reversedSequence.cacheResult = cacheResultThrough;
        reversedSequence.__iterate = function(fn, reverse) {
          var this$1$12 = this;
          var i = 0;
          reverse && ensureSize(collection);
          return collection.__iterate(
            function(v, k) {
              return fn(v, useKeys ? k : reverse ? this$1$12.size - ++i : i++, this$1$12);
            },
            !reverse
          );
        };
        reversedSequence.__iterator = function(type, reverse) {
          var i = 0;
          reverse && ensureSize(collection);
          var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse);
          return new Iterator(function() {
            var step = iterator.next();
            if (step.done) {
              return step;
            }
            var entry = step.value;
            return iteratorValue(
              type,
              useKeys ? entry[0] : reverse ? this$1$1.size - ++i : i++,
              entry[1],
              step
            );
          });
        };
        return reversedSequence;
      }
      function filterFactory(collection, predicate, context, useKeys) {
        var filterSequence = makeSequence(collection);
        if (useKeys) {
          filterSequence.has = function(key) {
            var v = collection.get(key, NOT_SET);
            return v !== NOT_SET && !!predicate.call(context, v, key, collection);
          };
          filterSequence.get = function(key, notSetValue) {
            var v = collection.get(key, NOT_SET);
            return v !== NOT_SET && predicate.call(context, v, key, collection) ? v : notSetValue;
          };
        }
        filterSequence.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          var iterations = 0;
          collection.__iterate(function(v, k, c) {
            if (predicate.call(context, v, k, c)) {
              iterations++;
              return fn(v, useKeys ? k : iterations - 1, this$1$1);
            }
          }, reverse);
          return iterations;
        };
        filterSequence.__iteratorUncached = function(type, reverse) {
          var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
          var iterations = 0;
          return new Iterator(function() {
            while (true) {
              var step = iterator.next();
              if (step.done) {
                return step;
              }
              var entry = step.value;
              var key = entry[0];
              var value = entry[1];
              if (predicate.call(context, value, key, collection)) {
                return iteratorValue(type, useKeys ? key : iterations++, value, step);
              }
            }
          });
        };
        return filterSequence;
      }
      function countByFactory(collection, grouper, context) {
        var groups = Map2().asMutable();
        collection.__iterate(function(v, k) {
          groups.update(grouper.call(context, v, k, collection), 0, function(a) {
            return a + 1;
          });
        });
        return groups.asImmutable();
      }
      function groupByFactory(collection, grouper, context) {
        var isKeyedIter = isKeyed(collection);
        var groups = (isOrdered(collection) ? OrderedMap() : Map2()).asMutable();
        collection.__iterate(function(v, k) {
          groups.update(
            grouper.call(context, v, k, collection),
            function(a) {
              return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
            }
          );
        });
        var coerce = collectionClass(collection);
        return groups.map(function(arr) {
          return reify(collection, coerce(arr));
        }).asImmutable();
      }
      function partitionFactory(collection, predicate, context) {
        var isKeyedIter = isKeyed(collection);
        var groups = [[], []];
        collection.__iterate(function(v, k) {
          groups[predicate.call(context, v, k, collection) ? 1 : 0].push(
            isKeyedIter ? [k, v] : v
          );
        });
        var coerce = collectionClass(collection);
        return groups.map(function(arr) {
          return reify(collection, coerce(arr));
        });
      }
      function sliceFactory(collection, begin, end, useKeys) {
        var originalSize = collection.size;
        if (wholeSlice(begin, end, originalSize)) {
          return collection;
        }
        if (typeof originalSize === "undefined" && (begin < 0 || end < 0)) {
          return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
        }
        var resolvedBegin = resolveBegin(begin, originalSize);
        var resolvedEnd = resolveEnd(end, originalSize);
        var resolvedSize = resolvedEnd - resolvedBegin;
        var sliceSize;
        if (resolvedSize === resolvedSize) {
          sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
        }
        var sliceSeq = makeSequence(collection);
        sliceSeq.size = sliceSize === 0 ? sliceSize : collection.size && sliceSize || void 0;
        if (!useKeys && isSeq(collection) && sliceSize >= 0) {
          sliceSeq.get = function(index, notSetValue) {
            index = wrapIndex(this, index);
            return index >= 0 && index < sliceSize ? collection.get(index + resolvedBegin, notSetValue) : notSetValue;
          };
        }
        sliceSeq.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          if (sliceSize === 0) {
            return 0;
          }
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var skipped = 0;
          var isSkipping = true;
          var iterations = 0;
          collection.__iterate(function(v, k) {
            if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
              iterations++;
              return fn(v, useKeys ? k : iterations - 1, this$1$1) !== false && iterations !== sliceSize;
            }
          });
          return iterations;
        };
        sliceSeq.__iteratorUncached = function(type, reverse) {
          if (sliceSize !== 0 && reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          if (sliceSize === 0) {
            return new Iterator(iteratorDone);
          }
          var iterator = collection.__iterator(type, reverse);
          var skipped = 0;
          var iterations = 0;
          return new Iterator(function() {
            while (skipped++ < resolvedBegin) {
              iterator.next();
            }
            if (++iterations > sliceSize) {
              return iteratorDone();
            }
            var step = iterator.next();
            if (useKeys || type === ITERATE_VALUES || step.done) {
              return step;
            }
            if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations - 1, void 0, step);
            }
            return iteratorValue(type, iterations - 1, step.value[1], step);
          });
        };
        return sliceSeq;
      }
      function takeWhileFactory(collection, predicate, context) {
        var takeSequence = makeSequence(collection);
        takeSequence.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var iterations = 0;
          collection.__iterate(
            function(v, k, c) {
              return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$1$1);
            }
          );
          return iterations;
        };
        takeSequence.__iteratorUncached = function(type, reverse) {
          var this$1$1 = this;
          if (reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
          var iterating = true;
          return new Iterator(function() {
            if (!iterating) {
              return iteratorDone();
            }
            var step = iterator.next();
            if (step.done) {
              return step;
            }
            var entry = step.value;
            var k = entry[0];
            var v = entry[1];
            if (!predicate.call(context, v, k, this$1$1)) {
              iterating = false;
              return iteratorDone();
            }
            return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
          });
        };
        return takeSequence;
      }
      function skipWhileFactory(collection, predicate, context, useKeys) {
        var skipSequence = makeSequence(collection);
        skipSequence.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var isSkipping = true;
          var iterations = 0;
          collection.__iterate(function(v, k, c) {
            if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
              iterations++;
              return fn(v, useKeys ? k : iterations - 1, this$1$1);
            }
          });
          return iterations;
        };
        skipSequence.__iteratorUncached = function(type, reverse) {
          var this$1$1 = this;
          if (reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
          var skipping = true;
          var iterations = 0;
          return new Iterator(function() {
            var step;
            var k;
            var v;
            do {
              step = iterator.next();
              if (step.done) {
                if (useKeys || type === ITERATE_VALUES) {
                  return step;
                }
                if (type === ITERATE_KEYS) {
                  return iteratorValue(type, iterations++, void 0, step);
                }
                return iteratorValue(type, iterations++, step.value[1], step);
              }
              var entry = step.value;
              k = entry[0];
              v = entry[1];
              skipping && (skipping = predicate.call(context, v, k, this$1$1));
            } while (skipping);
            return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
          });
        };
        return skipSequence;
      }
      function concatFactory(collection, values) {
        var isKeyedCollection = isKeyed(collection);
        var iters = [collection].concat(values).map(function(v) {
          if (!isCollection(v)) {
            v = isKeyedCollection ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
          } else if (isKeyedCollection) {
            v = KeyedCollection(v);
          }
          return v;
        }).filter(function(v) {
          return v.size !== 0;
        });
        if (iters.length === 0) {
          return collection;
        }
        if (iters.length === 1) {
          var singleton = iters[0];
          if (singleton === collection || isKeyedCollection && isKeyed(singleton) || isIndexed(collection) && isIndexed(singleton)) {
            return singleton;
          }
        }
        var concatSeq = new ArraySeq(iters);
        if (isKeyedCollection) {
          concatSeq = concatSeq.toKeyedSeq();
        } else if (!isIndexed(collection)) {
          concatSeq = concatSeq.toSetSeq();
        }
        concatSeq = concatSeq.flatten(true);
        concatSeq.size = iters.reduce(function(sum, seq) {
          if (sum !== void 0) {
            var size = seq.size;
            if (size !== void 0) {
              return sum + size;
            }
          }
        }, 0);
        return concatSeq;
      }
      function flattenFactory(collection, depth, useKeys) {
        var flatSequence = makeSequence(collection);
        flatSequence.__iterateUncached = function(fn, reverse) {
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var iterations = 0;
          var stopped = false;
          function flatDeep(iter, currentDepth) {
            iter.__iterate(function(v, k) {
              if ((!depth || currentDepth < depth) && isCollection(v)) {
                flatDeep(v, currentDepth + 1);
              } else {
                iterations++;
                if (fn(v, useKeys ? k : iterations - 1, flatSequence) === false) {
                  stopped = true;
                }
              }
              return !stopped;
            }, reverse);
          }
          flatDeep(collection, 0);
          return iterations;
        };
        flatSequence.__iteratorUncached = function(type, reverse) {
          if (reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          var iterator = collection.__iterator(type, reverse);
          var stack = [];
          var iterations = 0;
          return new Iterator(function() {
            while (iterator) {
              var step = iterator.next();
              if (step.done !== false) {
                iterator = stack.pop();
                continue;
              }
              var v = step.value;
              if (type === ITERATE_ENTRIES) {
                v = v[1];
              }
              if ((!depth || stack.length < depth) && isCollection(v)) {
                stack.push(iterator);
                iterator = v.__iterator(type, reverse);
              } else {
                return useKeys ? step : iteratorValue(type, iterations++, v, step);
              }
            }
            return iteratorDone();
          });
        };
        return flatSequence;
      }
      function flatMapFactory(collection, mapper, context) {
        var coerce = collectionClass(collection);
        return collection.toSeq().map(function(v, k) {
          return coerce(mapper.call(context, v, k, collection));
        }).flatten(true);
      }
      function interposeFactory(collection, separator) {
        var interposedSequence = makeSequence(collection);
        interposedSequence.size = collection.size && collection.size * 2 - 1;
        interposedSequence.__iterateUncached = function(fn, reverse) {
          var this$1$1 = this;
          var iterations = 0;
          collection.__iterate(
            function(v) {
              return (!iterations || fn(separator, iterations++, this$1$1) !== false) && fn(v, iterations++, this$1$1) !== false;
            },
            reverse
          );
          return iterations;
        };
        interposedSequence.__iteratorUncached = function(type, reverse) {
          var iterator = collection.__iterator(ITERATE_VALUES, reverse);
          var iterations = 0;
          var step;
          return new Iterator(function() {
            if (!step || iterations % 2) {
              step = iterator.next();
              if (step.done) {
                return step;
              }
            }
            return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
          });
        };
        return interposedSequence;
      }
      function sortFactory(collection, comparator, mapper) {
        if (!comparator) {
          comparator = defaultComparator;
        }
        var isKeyedCollection = isKeyed(collection);
        var index = 0;
        var entries = collection.toSeq().map(function(v, k) {
          return [k, v, index++, mapper ? mapper(v, k, collection) : v];
        }).valueSeq().toArray();
        entries.sort(function(a, b) {
          return comparator(a[3], b[3]) || a[2] - b[2];
        }).forEach(
          isKeyedCollection ? function(v, i) {
            entries[i].length = 2;
          } : function(v, i) {
            entries[i] = v[1];
          }
        );
        return isKeyedCollection ? KeyedSeq(entries) : isIndexed(collection) ? IndexedSeq(entries) : SetSeq(entries);
      }
      function maxFactory(collection, comparator, mapper) {
        if (!comparator) {
          comparator = defaultComparator;
        }
        if (mapper) {
          var entry = collection.toSeq().map(function(v, k) {
            return [v, mapper(v, k, collection)];
          }).reduce(function(a, b) {
            return maxCompare(comparator, a[1], b[1]) ? b : a;
          });
          return entry && entry[0];
        }
        return collection.reduce(function(a, b) {
          return maxCompare(comparator, a, b) ? b : a;
        });
      }
      function maxCompare(comparator, a, b) {
        var comp = comparator(b, a);
        return comp === 0 && b !== a && (b === void 0 || b === null || b !== b) || comp > 0;
      }
      function zipWithFactory(keyIter, zipper, iters, zipAll) {
        var zipSequence = makeSequence(keyIter);
        var sizes = new ArraySeq(iters).map(function(i) {
          return i.size;
        });
        zipSequence.size = zipAll ? sizes.max() : sizes.min();
        zipSequence.__iterate = function(fn, reverse) {
          var iterator = this.__iterator(ITERATE_VALUES, reverse);
          var step;
          var iterations = 0;
          while (!(step = iterator.next()).done) {
            if (fn(step.value, iterations++, this) === false) {
              break;
            }
          }
          return iterations;
        };
        zipSequence.__iteratorUncached = function(type, reverse) {
          var iterators = iters.map(
            function(i) {
              return i = Collection(i), getIterator(reverse ? i.reverse() : i);
            }
          );
          var iterations = 0;
          var isDone = false;
          return new Iterator(function() {
            var steps;
            if (!isDone) {
              steps = iterators.map(function(i) {
                return i.next();
              });
              isDone = zipAll ? steps.every(function(s) {
                return s.done;
              }) : steps.some(function(s) {
                return s.done;
              });
            }
            if (isDone) {
              return iteratorDone();
            }
            return iteratorValue(
              type,
              iterations++,
              zipper.apply(
                null,
                steps.map(function(s) {
                  return s.value;
                })
              )
            );
          });
        };
        return zipSequence;
      }
      function reify(iter, seq) {
        return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
      }
      function validateEntry(entry) {
        if (entry !== Object(entry)) {
          throw new TypeError("Expected [K, V] tuple: " + entry);
        }
      }
      function collectionClass(collection) {
        return isKeyed(collection) ? KeyedCollection : isIndexed(collection) ? IndexedCollection : SetCollection;
      }
      function makeSequence(collection) {
        return Object.create(
          (isKeyed(collection) ? KeyedSeq : isIndexed(collection) ? IndexedSeq : SetSeq).prototype
        );
      }
      function cacheResultThrough() {
        if (this._iter.cacheResult) {
          this._iter.cacheResult();
          this.size = this._iter.size;
          return this;
        }
        return Seq.prototype.cacheResult.call(this);
      }
      function defaultComparator(a, b) {
        if (a === void 0 && b === void 0) {
          return 0;
        }
        if (a === void 0) {
          return 1;
        }
        if (b === void 0) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      }
      function arrCopy(arr, offset) {
        offset = offset || 0;
        var len = Math.max(0, arr.length - offset);
        var newArr = new Array(len);
        for (var ii = 0; ii < len; ii++) {
          newArr[ii] = arr[ii + offset];
        }
        return newArr;
      }
      function invariant(condition, error) {
        if (!condition) {
          throw new Error(error);
        }
      }
      function assertNotInfinite(size) {
        invariant(
          size !== Infinity,
          "Cannot perform this action with an infinite size."
        );
      }
      function coerceKeyPath(keyPath) {
        if (isArrayLike(keyPath) && typeof keyPath !== "string") {
          return keyPath;
        }
        if (isOrdered(keyPath)) {
          return keyPath.toArray();
        }
        throw new TypeError(
          "Invalid keyPath: expected Ordered Collection or Array: " + keyPath
        );
      }
      var toString = Object.prototype.toString;
      function isPlainObject(value) {
        if (!value || typeof value !== "object" || toString.call(value) !== "[object Object]") {
          return false;
        }
        var proto = Object.getPrototypeOf(value);
        if (proto === null) {
          return true;
        }
        var parentProto = proto;
        var nextProto = Object.getPrototypeOf(proto);
        while (nextProto !== null) {
          parentProto = nextProto;
          nextProto = Object.getPrototypeOf(parentProto);
        }
        return parentProto === proto;
      }
      function isDataStructure(value) {
        return typeof value === "object" && (isImmutable(value) || Array.isArray(value) || isPlainObject(value));
      }
      function quoteString(value) {
        try {
          return typeof value === "string" ? JSON.stringify(value) : String(value);
        } catch (_ignoreError) {
          return JSON.stringify(value);
        }
      }
      function has(collection, key) {
        return isImmutable(collection) ? collection.has(key) : isDataStructure(collection) && hasOwnProperty.call(collection, key);
      }
      function get(collection, key, notSetValue) {
        return isImmutable(collection) ? collection.get(key, notSetValue) : !has(collection, key) ? notSetValue : typeof collection.get === "function" ? collection.get(key) : collection[key];
      }
      function shallowCopy(from) {
        if (Array.isArray(from)) {
          return arrCopy(from);
        }
        var to = {};
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        return to;
      }
      function remove(collection, key) {
        if (!isDataStructure(collection)) {
          throw new TypeError(
            "Cannot update non-data-structure value: " + collection
          );
        }
        if (isImmutable(collection)) {
          if (!collection.remove) {
            throw new TypeError(
              "Cannot update immutable value without .remove() method: " + collection
            );
          }
          return collection.remove(key);
        }
        if (!hasOwnProperty.call(collection, key)) {
          return collection;
        }
        var collectionCopy = shallowCopy(collection);
        if (Array.isArray(collectionCopy)) {
          collectionCopy.splice(key, 1);
        } else {
          delete collectionCopy[key];
        }
        return collectionCopy;
      }
      function set(collection, key, value) {
        if (!isDataStructure(collection)) {
          throw new TypeError(
            "Cannot update non-data-structure value: " + collection
          );
        }
        if (isImmutable(collection)) {
          if (!collection.set) {
            throw new TypeError(
              "Cannot update immutable value without .set() method: " + collection
            );
          }
          return collection.set(key, value);
        }
        if (hasOwnProperty.call(collection, key) && value === collection[key]) {
          return collection;
        }
        var collectionCopy = shallowCopy(collection);
        collectionCopy[key] = value;
        return collectionCopy;
      }
      function updateIn$1(collection, keyPath, notSetValue, updater) {
        if (!updater) {
          updater = notSetValue;
          notSetValue = void 0;
        }
        var updatedValue = updateInDeeply(
          isImmutable(collection),
          collection,
          coerceKeyPath(keyPath),
          0,
          notSetValue,
          updater
        );
        return updatedValue === NOT_SET ? notSetValue : updatedValue;
      }
      function updateInDeeply(inImmutable, existing, keyPath, i, notSetValue, updater) {
        var wasNotSet = existing === NOT_SET;
        if (i === keyPath.length) {
          var existingValue = wasNotSet ? notSetValue : existing;
          var newValue = updater(existingValue);
          return newValue === existingValue ? existing : newValue;
        }
        if (!wasNotSet && !isDataStructure(existing)) {
          throw new TypeError(
            "Cannot update within non-data-structure value in path [" + keyPath.slice(0, i).map(quoteString) + "]: " + existing
          );
        }
        var key = keyPath[i];
        var nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
        var nextUpdated = updateInDeeply(
          nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting),
          nextExisting,
          keyPath,
          i + 1,
          notSetValue,
          updater
        );
        return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? remove(existing, key) : set(
          wasNotSet ? inImmutable ? emptyMap() : {} : existing,
          key,
          nextUpdated
        );
      }
      function setIn$1(collection, keyPath, value) {
        return updateIn$1(collection, keyPath, NOT_SET, function() {
          return value;
        });
      }
      function setIn(keyPath, v) {
        return setIn$1(this, keyPath, v);
      }
      function removeIn(collection, keyPath) {
        return updateIn$1(collection, keyPath, function() {
          return NOT_SET;
        });
      }
      function deleteIn(keyPath) {
        return removeIn(this, keyPath);
      }
      function update$1(collection, key, notSetValue, updater) {
        return updateIn$1(collection, [key], notSetValue, updater);
      }
      function update(key, notSetValue, updater) {
        return arguments.length === 1 ? key(this) : update$1(this, key, notSetValue, updater);
      }
      function updateIn(keyPath, notSetValue, updater) {
        return updateIn$1(this, keyPath, notSetValue, updater);
      }
      function merge$1() {
        var iters = [], len = arguments.length;
        while (len--)
          iters[len] = arguments[len];
        return mergeIntoKeyedWith(this, iters);
      }
      function mergeWith$1(merger) {
        var iters = [], len = arguments.length - 1;
        while (len-- > 0)
          iters[len] = arguments[len + 1];
        if (typeof merger !== "function") {
          throw new TypeError("Invalid merger function: " + merger);
        }
        return mergeIntoKeyedWith(this, iters, merger);
      }
      function mergeIntoKeyedWith(collection, collections, merger) {
        var iters = [];
        for (var ii = 0; ii < collections.length; ii++) {
          var collection$1 = KeyedCollection(collections[ii]);
          if (collection$1.size !== 0) {
            iters.push(collection$1);
          }
        }
        if (iters.length === 0) {
          return collection;
        }
        if (collection.toSeq().size === 0 && !collection.__ownerID && iters.length === 1) {
          return collection.constructor(iters[0]);
        }
        return collection.withMutations(function(collection2) {
          var mergeIntoCollection = merger ? function(value, key) {
            update$1(
              collection2,
              key,
              NOT_SET,
              function(oldVal) {
                return oldVal === NOT_SET ? value : merger(oldVal, value, key);
              }
            );
          } : function(value, key) {
            collection2.set(key, value);
          };
          for (var ii2 = 0; ii2 < iters.length; ii2++) {
            iters[ii2].forEach(mergeIntoCollection);
          }
        });
      }
      function merge(collection) {
        var sources = [], len = arguments.length - 1;
        while (len-- > 0)
          sources[len] = arguments[len + 1];
        return mergeWithSources(collection, sources);
      }
      function mergeWith(merger, collection) {
        var sources = [], len = arguments.length - 2;
        while (len-- > 0)
          sources[len] = arguments[len + 2];
        return mergeWithSources(collection, sources, merger);
      }
      function mergeDeep$1(collection) {
        var sources = [], len = arguments.length - 1;
        while (len-- > 0)
          sources[len] = arguments[len + 1];
        return mergeDeepWithSources(collection, sources);
      }
      function mergeDeepWith$1(merger, collection) {
        var sources = [], len = arguments.length - 2;
        while (len-- > 0)
          sources[len] = arguments[len + 2];
        return mergeDeepWithSources(collection, sources, merger);
      }
      function mergeDeepWithSources(collection, sources, merger) {
        return mergeWithSources(collection, sources, deepMergerWith(merger));
      }
      function mergeWithSources(collection, sources, merger) {
        if (!isDataStructure(collection)) {
          throw new TypeError(
            "Cannot merge into non-data-structure value: " + collection
          );
        }
        if (isImmutable(collection)) {
          return typeof merger === "function" && collection.mergeWith ? collection.mergeWith.apply(collection, [merger].concat(sources)) : collection.merge ? collection.merge.apply(collection, sources) : collection.concat.apply(collection, sources);
        }
        var isArray = Array.isArray(collection);
        var merged = collection;
        var Collection2 = isArray ? IndexedCollection : KeyedCollection;
        var mergeItem = isArray ? function(value) {
          if (merged === collection) {
            merged = shallowCopy(merged);
          }
          merged.push(value);
        } : function(value, key) {
          var hasVal = hasOwnProperty.call(merged, key);
          var nextVal = hasVal && merger ? merger(merged[key], value, key) : value;
          if (!hasVal || nextVal !== merged[key]) {
            if (merged === collection) {
              merged = shallowCopy(merged);
            }
            merged[key] = nextVal;
          }
        };
        for (var i = 0; i < sources.length; i++) {
          Collection2(sources[i]).forEach(mergeItem);
        }
        return merged;
      }
      function deepMergerWith(merger) {
        function deepMerger(oldValue, newValue, key) {
          return isDataStructure(oldValue) && isDataStructure(newValue) && areMergeable(oldValue, newValue) ? mergeWithSources(oldValue, [newValue], deepMerger) : merger ? merger(oldValue, newValue, key) : newValue;
        }
        return deepMerger;
      }
      function areMergeable(oldDataStructure, newDataStructure) {
        var oldSeq = Seq(oldDataStructure);
        var newSeq = Seq(newDataStructure);
        return isIndexed(oldSeq) === isIndexed(newSeq) && isKeyed(oldSeq) === isKeyed(newSeq);
      }
      function mergeDeep() {
        var iters = [], len = arguments.length;
        while (len--)
          iters[len] = arguments[len];
        return mergeDeepWithSources(this, iters);
      }
      function mergeDeepWith(merger) {
        var iters = [], len = arguments.length - 1;
        while (len-- > 0)
          iters[len] = arguments[len + 1];
        return mergeDeepWithSources(this, iters, merger);
      }
      function mergeIn(keyPath) {
        var iters = [], len = arguments.length - 1;
        while (len-- > 0)
          iters[len] = arguments[len + 1];
        return updateIn$1(this, keyPath, emptyMap(), function(m) {
          return mergeWithSources(m, iters);
        });
      }
      function mergeDeepIn(keyPath) {
        var iters = [], len = arguments.length - 1;
        while (len-- > 0)
          iters[len] = arguments[len + 1];
        return updateIn$1(
          this,
          keyPath,
          emptyMap(),
          function(m) {
            return mergeDeepWithSources(m, iters);
          }
        );
      }
      function withMutations(fn) {
        var mutable = this.asMutable();
        fn(mutable);
        return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
      }
      function asMutable() {
        return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
      }
      function asImmutable() {
        return this.__ensureOwner();
      }
      function wasAltered() {
        return this.__altered;
      }
      var Map2 = /* @__PURE__ */ function(KeyedCollection2) {
        function Map3(value) {
          return value === void 0 || value === null ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function(map) {
            var iter = KeyedCollection2(value);
            assertNotInfinite(iter.size);
            iter.forEach(function(v, k) {
              return map.set(k, v);
            });
          });
        }
        if (KeyedCollection2)
          Map3.__proto__ = KeyedCollection2;
        Map3.prototype = Object.create(KeyedCollection2 && KeyedCollection2.prototype);
        Map3.prototype.constructor = Map3;
        Map3.prototype.toString = function toString2() {
          return this.__toString("Map {", "}");
        };
        Map3.prototype.get = function get2(k, notSetValue) {
          return this._root ? this._root.get(0, void 0, k, notSetValue) : notSetValue;
        };
        Map3.prototype.set = function set2(k, v) {
          return updateMap(this, k, v);
        };
        Map3.prototype.remove = function remove2(k) {
          return updateMap(this, k, NOT_SET);
        };
        Map3.prototype.deleteAll = function deleteAll(keys) {
          var collection = Collection(keys);
          if (collection.size === 0) {
            return this;
          }
          return this.withMutations(function(map) {
            collection.forEach(function(key) {
              return map.remove(key);
            });
          });
        };
        Map3.prototype.clear = function clear() {
          if (this.size === 0) {
            return this;
          }
          if (this.__ownerID) {
            this.size = 0;
            this._root = null;
            this.__hash = void 0;
            this.__altered = true;
            return this;
          }
          return emptyMap();
        };
        Map3.prototype.sort = function sort(comparator) {
          return OrderedMap(sortFactory(this, comparator));
        };
        Map3.prototype.sortBy = function sortBy(mapper, comparator) {
          return OrderedMap(sortFactory(this, comparator, mapper));
        };
        Map3.prototype.map = function map(mapper, context) {
          var this$1$1 = this;
          return this.withMutations(function(map2) {
            map2.forEach(function(value, key) {
              map2.set(key, mapper.call(context, value, key, this$1$1));
            });
          });
        };
        Map3.prototype.__iterator = function __iterator(type, reverse) {
          return new MapIterator(this, type, reverse);
        };
        Map3.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          var iterations = 0;
          this._root && this._root.iterate(function(entry) {
            iterations++;
            return fn(entry[1], entry[0], this$1$1);
          }, reverse);
          return iterations;
        };
        Map3.prototype.__ensureOwner = function __ensureOwner(ownerID) {
          if (ownerID === this.__ownerID) {
            return this;
          }
          if (!ownerID) {
            if (this.size === 0) {
              return emptyMap();
            }
            this.__ownerID = ownerID;
            this.__altered = false;
            return this;
          }
          return makeMap(this.size, this._root, ownerID, this.__hash);
        };
        return Map3;
      }(KeyedCollection);
      Map2.isMap = isMap;
      var MapPrototype = Map2.prototype;
      MapPrototype[IS_MAP_SYMBOL] = true;
      MapPrototype[DELETE] = MapPrototype.remove;
      MapPrototype.removeAll = MapPrototype.deleteAll;
      MapPrototype.setIn = setIn;
      MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
      MapPrototype.update = update;
      MapPrototype.updateIn = updateIn;
      MapPrototype.merge = MapPrototype.concat = merge$1;
      MapPrototype.mergeWith = mergeWith$1;
      MapPrototype.mergeDeep = mergeDeep;
      MapPrototype.mergeDeepWith = mergeDeepWith;
      MapPrototype.mergeIn = mergeIn;
      MapPrototype.mergeDeepIn = mergeDeepIn;
      MapPrototype.withMutations = withMutations;
      MapPrototype.wasAltered = wasAltered;
      MapPrototype.asImmutable = asImmutable;
      MapPrototype["@@transducer/init"] = MapPrototype.asMutable = asMutable;
      MapPrototype["@@transducer/step"] = function(result, arr) {
        return result.set(arr[0], arr[1]);
      };
      MapPrototype["@@transducer/result"] = function(obj) {
        return obj.asImmutable();
      };
      var ArrayMapNode = function ArrayMapNode2(ownerID, entries) {
        this.ownerID = ownerID;
        this.entries = entries;
      };
      ArrayMapNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
        var entries = this.entries;
        for (var ii = 0, len = entries.length; ii < len; ii++) {
          if (is(key, entries[ii][0])) {
            return entries[ii][1];
          }
        }
        return notSetValue;
      };
      ArrayMapNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        var removed = value === NOT_SET;
        var entries = this.entries;
        var idx = 0;
        var len = entries.length;
        for (; idx < len; idx++) {
          if (is(key, entries[idx][0])) {
            break;
          }
        }
        var exists = idx < len;
        if (exists ? entries[idx][1] === value : removed) {
          return this;
        }
        SetRef(didAlter);
        (removed || !exists) && SetRef(didChangeSize);
        if (removed && entries.length === 1) {
          return;
        }
        if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
          return createNodes(ownerID, entries, key, value);
        }
        var isEditable = ownerID && ownerID === this.ownerID;
        var newEntries = isEditable ? entries : arrCopy(entries);
        if (exists) {
          if (removed) {
            idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
          } else {
            newEntries[idx] = [key, value];
          }
        } else {
          newEntries.push([key, value]);
        }
        if (isEditable) {
          this.entries = newEntries;
          return this;
        }
        return new ArrayMapNode(ownerID, newEntries);
      };
      var BitmapIndexedNode = function BitmapIndexedNode2(ownerID, bitmap, nodes) {
        this.ownerID = ownerID;
        this.bitmap = bitmap;
        this.nodes = nodes;
      };
      BitmapIndexedNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
        var bitmap = this.bitmap;
        return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(
          shift + SHIFT,
          keyHash,
          key,
          notSetValue
        );
      };
      BitmapIndexedNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
        var bit = 1 << keyHashFrag;
        var bitmap = this.bitmap;
        var exists = (bitmap & bit) !== 0;
        if (!exists && value === NOT_SET) {
          return this;
        }
        var idx = popCount(bitmap & bit - 1);
        var nodes = this.nodes;
        var node = exists ? nodes[idx] : void 0;
        var newNode = updateNode(
          node,
          ownerID,
          shift + SHIFT,
          keyHash,
          key,
          value,
          didChangeSize,
          didAlter
        );
        if (newNode === node) {
          return this;
        }
        if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
          return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
        }
        if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
          return nodes[idx ^ 1];
        }
        if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
          return newNode;
        }
        var isEditable = ownerID && ownerID === this.ownerID;
        var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
        var newNodes = exists ? newNode ? setAt(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);
        if (isEditable) {
          this.bitmap = newBitmap;
          this.nodes = newNodes;
          return this;
        }
        return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
      };
      var HashArrayMapNode = function HashArrayMapNode2(ownerID, count, nodes) {
        this.ownerID = ownerID;
        this.count = count;
        this.nodes = nodes;
      };
      HashArrayMapNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
        var node = this.nodes[idx];
        return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
      };
      HashArrayMapNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
        var removed = value === NOT_SET;
        var nodes = this.nodes;
        var node = nodes[idx];
        if (removed && !node) {
          return this;
        }
        var newNode = updateNode(
          node,
          ownerID,
          shift + SHIFT,
          keyHash,
          key,
          value,
          didChangeSize,
          didAlter
        );
        if (newNode === node) {
          return this;
        }
        var newCount = this.count;
        if (!node) {
          newCount++;
        } else if (!newNode) {
          newCount--;
          if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
            return packNodes(ownerID, nodes, newCount, idx);
          }
        }
        var isEditable = ownerID && ownerID === this.ownerID;
        var newNodes = setAt(nodes, idx, newNode, isEditable);
        if (isEditable) {
          this.count = newCount;
          this.nodes = newNodes;
          return this;
        }
        return new HashArrayMapNode(ownerID, newCount, newNodes);
      };
      var HashCollisionNode = function HashCollisionNode2(ownerID, keyHash, entries) {
        this.ownerID = ownerID;
        this.keyHash = keyHash;
        this.entries = entries;
      };
      HashCollisionNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
        var entries = this.entries;
        for (var ii = 0, len = entries.length; ii < len; ii++) {
          if (is(key, entries[ii][0])) {
            return entries[ii][1];
          }
        }
        return notSetValue;
      };
      HashCollisionNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var removed = value === NOT_SET;
        if (keyHash !== this.keyHash) {
          if (removed) {
            return this;
          }
          SetRef(didAlter);
          SetRef(didChangeSize);
          return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
        }
        var entries = this.entries;
        var idx = 0;
        var len = entries.length;
        for (; idx < len; idx++) {
          if (is(key, entries[idx][0])) {
            break;
          }
        }
        var exists = idx < len;
        if (exists ? entries[idx][1] === value : removed) {
          return this;
        }
        SetRef(didAlter);
        (removed || !exists) && SetRef(didChangeSize);
        if (removed && len === 2) {
          return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
        }
        var isEditable = ownerID && ownerID === this.ownerID;
        var newEntries = isEditable ? entries : arrCopy(entries);
        if (exists) {
          if (removed) {
            idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
          } else {
            newEntries[idx] = [key, value];
          }
        } else {
          newEntries.push([key, value]);
        }
        if (isEditable) {
          this.entries = newEntries;
          return this;
        }
        return new HashCollisionNode(ownerID, this.keyHash, newEntries);
      };
      var ValueNode = function ValueNode2(ownerID, keyHash, entry) {
        this.ownerID = ownerID;
        this.keyHash = keyHash;
        this.entry = entry;
      };
      ValueNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
        return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
      };
      ValueNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        var removed = value === NOT_SET;
        var keyMatch = is(key, this.entry[0]);
        if (keyMatch ? value === this.entry[1] : removed) {
          return this;
        }
        SetRef(didAlter);
        if (removed) {
          SetRef(didChangeSize);
          return;
        }
        if (keyMatch) {
          if (ownerID && ownerID === this.ownerID) {
            this.entry[1] = value;
            return this;
          }
          return new ValueNode(ownerID, this.keyHash, [key, value]);
        }
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
      };
      ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(fn, reverse) {
        var entries = this.entries;
        for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
          if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
            return false;
          }
        }
      };
      BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(fn, reverse) {
        var nodes = this.nodes;
        for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
          var node = nodes[reverse ? maxIndex - ii : ii];
          if (node && node.iterate(fn, reverse) === false) {
            return false;
          }
        }
      };
      ValueNode.prototype.iterate = function(fn, reverse) {
        return fn(this.entry);
      };
      var MapIterator = /* @__PURE__ */ function(Iterator2) {
        function MapIterator2(map, type, reverse) {
          this._type = type;
          this._reverse = reverse;
          this._stack = map._root && mapIteratorFrame(map._root);
        }
        if (Iterator2)
          MapIterator2.__proto__ = Iterator2;
        MapIterator2.prototype = Object.create(Iterator2 && Iterator2.prototype);
        MapIterator2.prototype.constructor = MapIterator2;
        MapIterator2.prototype.next = function next() {
          var type = this._type;
          var stack = this._stack;
          while (stack) {
            var node = stack.node;
            var index = stack.index++;
            var maxIndex = void 0;
            if (node.entry) {
              if (index === 0) {
                return mapIteratorValue(type, node.entry);
              }
            } else if (node.entries) {
              maxIndex = node.entries.length - 1;
              if (index <= maxIndex) {
                return mapIteratorValue(
                  type,
                  node.entries[this._reverse ? maxIndex - index : index]
                );
              }
            } else {
              maxIndex = node.nodes.length - 1;
              if (index <= maxIndex) {
                var subNode = node.nodes[this._reverse ? maxIndex - index : index];
                if (subNode) {
                  if (subNode.entry) {
                    return mapIteratorValue(type, subNode.entry);
                  }
                  stack = this._stack = mapIteratorFrame(subNode, stack);
                }
                continue;
              }
            }
            stack = this._stack = this._stack.__prev;
          }
          return iteratorDone();
        };
        return MapIterator2;
      }(Iterator);
      function mapIteratorValue(type, entry) {
        return iteratorValue(type, entry[0], entry[1]);
      }
      function mapIteratorFrame(node, prev) {
        return {
          node,
          index: 0,
          __prev: prev
        };
      }
      function makeMap(size, root, ownerID, hash2) {
        var map = Object.create(MapPrototype);
        map.size = size;
        map._root = root;
        map.__ownerID = ownerID;
        map.__hash = hash2;
        map.__altered = false;
        return map;
      }
      var EMPTY_MAP;
      function emptyMap() {
        return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
      }
      function updateMap(map, k, v) {
        var newRoot;
        var newSize;
        if (!map._root) {
          if (v === NOT_SET) {
            return map;
          }
          newSize = 1;
          newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
        } else {
          var didChangeSize = MakeRef();
          var didAlter = MakeRef();
          newRoot = updateNode(
            map._root,
            map.__ownerID,
            0,
            void 0,
            k,
            v,
            didChangeSize,
            didAlter
          );
          if (!didAlter.value) {
            return map;
          }
          newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
        }
        if (map.__ownerID) {
          map.size = newSize;
          map._root = newRoot;
          map.__hash = void 0;
          map.__altered = true;
          return map;
        }
        return newRoot ? makeMap(newSize, newRoot) : emptyMap();
      }
      function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        if (!node) {
          if (value === NOT_SET) {
            return node;
          }
          SetRef(didAlter);
          SetRef(didChangeSize);
          return new ValueNode(ownerID, keyHash, [key, value]);
        }
        return node.update(
          ownerID,
          shift,
          keyHash,
          key,
          value,
          didChangeSize,
          didAlter
        );
      }
      function isLeafNode(node) {
        return node.constructor === ValueNode || node.constructor === HashCollisionNode;
      }
      function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
        if (node.keyHash === keyHash) {
          return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
        }
        var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
        var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
        var newNode;
        var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);
        return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
      }
      function createNodes(ownerID, entries, key, value) {
        if (!ownerID) {
          ownerID = new OwnerID();
        }
        var node = new ValueNode(ownerID, hash(key), [key, value]);
        for (var ii = 0; ii < entries.length; ii++) {
          var entry = entries[ii];
          node = node.update(ownerID, 0, void 0, entry[0], entry[1]);
        }
        return node;
      }
      function packNodes(ownerID, nodes, count, excluding) {
        var bitmap = 0;
        var packedII = 0;
        var packedNodes = new Array(count);
        for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
          var node = nodes[ii];
          if (node !== void 0 && ii !== excluding) {
            bitmap |= bit;
            packedNodes[packedII++] = node;
          }
        }
        return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
      }
      function expandNodes(ownerID, nodes, bitmap, including, node) {
        var count = 0;
        var expandedNodes = new Array(SIZE);
        for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
          expandedNodes[ii] = bitmap & 1 ? nodes[count++] : void 0;
        }
        expandedNodes[including] = node;
        return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
      }
      function popCount(x) {
        x -= x >> 1 & 1431655765;
        x = (x & 858993459) + (x >> 2 & 858993459);
        x = x + (x >> 4) & 252645135;
        x += x >> 8;
        x += x >> 16;
        return x & 127;
      }
      function setAt(array, idx, val, canEdit) {
        var newArray = canEdit ? array : arrCopy(array);
        newArray[idx] = val;
        return newArray;
      }
      function spliceIn(array, idx, val, canEdit) {
        var newLen = array.length + 1;
        if (canEdit && idx + 1 === newLen) {
          array[idx] = val;
          return array;
        }
        var newArray = new Array(newLen);
        var after = 0;
        for (var ii = 0; ii < newLen; ii++) {
          if (ii === idx) {
            newArray[ii] = val;
            after = -1;
          } else {
            newArray[ii] = array[ii + after];
          }
        }
        return newArray;
      }
      function spliceOut(array, idx, canEdit) {
        var newLen = array.length - 1;
        if (canEdit && idx === newLen) {
          array.pop();
          return array;
        }
        var newArray = new Array(newLen);
        var after = 0;
        for (var ii = 0; ii < newLen; ii++) {
          if (ii === idx) {
            after = 1;
          }
          newArray[ii] = array[ii + after];
        }
        return newArray;
      }
      var MAX_ARRAY_MAP_SIZE = SIZE / 4;
      var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
      var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;
      var IS_LIST_SYMBOL = "@@__IMMUTABLE_LIST__@@";
      function isList(maybeList) {
        return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
      }
      var List = /* @__PURE__ */ function(IndexedCollection2) {
        function List2(value) {
          var empty = emptyList();
          if (value === void 0 || value === null) {
            return empty;
          }
          if (isList(value)) {
            return value;
          }
          var iter = IndexedCollection2(value);
          var size = iter.size;
          if (size === 0) {
            return empty;
          }
          assertNotInfinite(size);
          if (size > 0 && size < SIZE) {
            return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
          }
          return empty.withMutations(function(list) {
            list.setSize(size);
            iter.forEach(function(v, i) {
              return list.set(i, v);
            });
          });
        }
        if (IndexedCollection2)
          List2.__proto__ = IndexedCollection2;
        List2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
        List2.prototype.constructor = List2;
        List2.of = function of() {
          return this(arguments);
        };
        List2.prototype.toString = function toString2() {
          return this.__toString("List [", "]");
        };
        List2.prototype.get = function get2(index, notSetValue) {
          index = wrapIndex(this, index);
          if (index >= 0 && index < this.size) {
            index += this._origin;
            var node = listNodeFor(this, index);
            return node && node.array[index & MASK];
          }
          return notSetValue;
        };
        List2.prototype.set = function set2(index, value) {
          return updateList(this, index, value);
        };
        List2.prototype.remove = function remove2(index) {
          return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
        };
        List2.prototype.insert = function insert(index, value) {
          return this.splice(index, 0, value);
        };
        List2.prototype.clear = function clear() {
          if (this.size === 0) {
            return this;
          }
          if (this.__ownerID) {
            this.size = this._origin = this._capacity = 0;
            this._level = SHIFT;
            this._root = this._tail = this.__hash = void 0;
            this.__altered = true;
            return this;
          }
          return emptyList();
        };
        List2.prototype.push = function push() {
          var values = arguments;
          var oldSize = this.size;
          return this.withMutations(function(list) {
            setListBounds(list, 0, oldSize + values.length);
            for (var ii = 0; ii < values.length; ii++) {
              list.set(oldSize + ii, values[ii]);
            }
          });
        };
        List2.prototype.pop = function pop() {
          return setListBounds(this, 0, -1);
        };
        List2.prototype.unshift = function unshift() {
          var values = arguments;
          return this.withMutations(function(list) {
            setListBounds(list, -values.length);
            for (var ii = 0; ii < values.length; ii++) {
              list.set(ii, values[ii]);
            }
          });
        };
        List2.prototype.shift = function shift() {
          return setListBounds(this, 1);
        };
        List2.prototype.concat = function concat() {
          var arguments$1 = arguments;
          var seqs = [];
          for (var i = 0; i < arguments.length; i++) {
            var argument = arguments$1[i];
            var seq = IndexedCollection2(
              typeof argument !== "string" && hasIterator(argument) ? argument : [argument]
            );
            if (seq.size !== 0) {
              seqs.push(seq);
            }
          }
          if (seqs.length === 0) {
            return this;
          }
          if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
            return this.constructor(seqs[0]);
          }
          return this.withMutations(function(list) {
            seqs.forEach(function(seq2) {
              return seq2.forEach(function(value) {
                return list.push(value);
              });
            });
          });
        };
        List2.prototype.setSize = function setSize(size) {
          return setListBounds(this, 0, size);
        };
        List2.prototype.map = function map(mapper, context) {
          var this$1$1 = this;
          return this.withMutations(function(list) {
            for (var i = 0; i < this$1$1.size; i++) {
              list.set(i, mapper.call(context, list.get(i), i, this$1$1));
            }
          });
        };
        List2.prototype.slice = function slice(begin, end) {
          var size = this.size;
          if (wholeSlice(begin, end, size)) {
            return this;
          }
          return setListBounds(
            this,
            resolveBegin(begin, size),
            resolveEnd(end, size)
          );
        };
        List2.prototype.__iterator = function __iterator(type, reverse) {
          var index = reverse ? this.size : 0;
          var values = iterateList(this, reverse);
          return new Iterator(function() {
            var value = values();
            return value === DONE ? iteratorDone() : iteratorValue(type, reverse ? --index : index++, value);
          });
        };
        List2.prototype.__iterate = function __iterate(fn, reverse) {
          var index = reverse ? this.size : 0;
          var values = iterateList(this, reverse);
          var value;
          while ((value = values()) !== DONE) {
            if (fn(value, reverse ? --index : index++, this) === false) {
              break;
            }
          }
          return index;
        };
        List2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
          if (ownerID === this.__ownerID) {
            return this;
          }
          if (!ownerID) {
            if (this.size === 0) {
              return emptyList();
            }
            this.__ownerID = ownerID;
            this.__altered = false;
            return this;
          }
          return makeList(
            this._origin,
            this._capacity,
            this._level,
            this._root,
            this._tail,
            ownerID,
            this.__hash
          );
        };
        return List2;
      }(IndexedCollection);
      List.isList = isList;
      var ListPrototype = List.prototype;
      ListPrototype[IS_LIST_SYMBOL] = true;
      ListPrototype[DELETE] = ListPrototype.remove;
      ListPrototype.merge = ListPrototype.concat;
      ListPrototype.setIn = setIn;
      ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
      ListPrototype.update = update;
      ListPrototype.updateIn = updateIn;
      ListPrototype.mergeIn = mergeIn;
      ListPrototype.mergeDeepIn = mergeDeepIn;
      ListPrototype.withMutations = withMutations;
      ListPrototype.wasAltered = wasAltered;
      ListPrototype.asImmutable = asImmutable;
      ListPrototype["@@transducer/init"] = ListPrototype.asMutable = asMutable;
      ListPrototype["@@transducer/step"] = function(result, arr) {
        return result.push(arr);
      };
      ListPrototype["@@transducer/result"] = function(obj) {
        return obj.asImmutable();
      };
      var VNode = function VNode2(array, ownerID) {
        this.array = array;
        this.ownerID = ownerID;
      };
      VNode.prototype.removeBefore = function removeBefore(ownerID, level, index) {
        if ((index & (1 << level + SHIFT) - 1) === 0 || this.array.length === 0) {
          return this;
        }
        var originIndex = index >>> level & MASK;
        if (originIndex >= this.array.length) {
          return new VNode([], ownerID);
        }
        var removingFirst = originIndex === 0;
        var newChild;
        if (level > 0) {
          var oldChild = this.array[originIndex];
          newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
          if (newChild === oldChild && removingFirst) {
            return this;
          }
        }
        if (removingFirst && !newChild) {
          return this;
        }
        var editable = editableVNode(this, ownerID);
        if (!removingFirst) {
          for (var ii = 0; ii < originIndex; ii++) {
            editable.array[ii] = void 0;
          }
        }
        if (newChild) {
          editable.array[originIndex] = newChild;
        }
        return editable;
      };
      VNode.prototype.removeAfter = function removeAfter(ownerID, level, index) {
        if (index === (level ? 1 << level + SHIFT : SIZE) || this.array.length === 0) {
          return this;
        }
        var sizeIndex = index - 1 >>> level & MASK;
        if (sizeIndex >= this.array.length) {
          return this;
        }
        var newChild;
        if (level > 0) {
          var oldChild = this.array[sizeIndex];
          newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
          if (newChild === oldChild && sizeIndex === this.array.length - 1) {
            return this;
          }
        }
        var editable = editableVNode(this, ownerID);
        editable.array.splice(sizeIndex + 1);
        if (newChild) {
          editable.array[sizeIndex] = newChild;
        }
        return editable;
      };
      var DONE = {};
      function iterateList(list, reverse) {
        var left = list._origin;
        var right = list._capacity;
        var tailPos = getTailOffset(right);
        var tail = list._tail;
        return iterateNodeOrLeaf(list._root, list._level, 0);
        function iterateNodeOrLeaf(node, level, offset) {
          return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
        }
        function iterateLeaf(node, offset) {
          var array = offset === tailPos ? tail && tail.array : node && node.array;
          var from = offset > left ? 0 : left - offset;
          var to = right - offset;
          if (to > SIZE) {
            to = SIZE;
          }
          return function() {
            if (from === to) {
              return DONE;
            }
            var idx = reverse ? --to : from++;
            return array && array[idx];
          };
        }
        function iterateNode(node, level, offset) {
          var values;
          var array = node && node.array;
          var from = offset > left ? 0 : left - offset >> level;
          var to = (right - offset >> level) + 1;
          if (to > SIZE) {
            to = SIZE;
          }
          return function() {
            while (true) {
              if (values) {
                var value = values();
                if (value !== DONE) {
                  return value;
                }
                values = null;
              }
              if (from === to) {
                return DONE;
              }
              var idx = reverse ? --to : from++;
              values = iterateNodeOrLeaf(
                array && array[idx],
                level - SHIFT,
                offset + (idx << level)
              );
            }
          };
        }
      }
      function makeList(origin, capacity, level, root, tail, ownerID, hash2) {
        var list = Object.create(ListPrototype);
        list.size = capacity - origin;
        list._origin = origin;
        list._capacity = capacity;
        list._level = level;
        list._root = root;
        list._tail = tail;
        list.__ownerID = ownerID;
        list.__hash = hash2;
        list.__altered = false;
        return list;
      }
      function emptyList() {
        return makeList(0, 0, SHIFT);
      }
      function updateList(list, index, value) {
        index = wrapIndex(list, index);
        if (index !== index) {
          return list;
        }
        if (index >= list.size || index < 0) {
          return list.withMutations(function(list2) {
            index < 0 ? setListBounds(list2, index).set(0, value) : setListBounds(list2, 0, index + 1).set(index, value);
          });
        }
        index += list._origin;
        var newTail = list._tail;
        var newRoot = list._root;
        var didAlter = MakeRef();
        if (index >= getTailOffset(list._capacity)) {
          newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
        } else {
          newRoot = updateVNode(
            newRoot,
            list.__ownerID,
            list._level,
            index,
            value,
            didAlter
          );
        }
        if (!didAlter.value) {
          return list;
        }
        if (list.__ownerID) {
          list._root = newRoot;
          list._tail = newTail;
          list.__hash = void 0;
          list.__altered = true;
          return list;
        }
        return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
      }
      function updateVNode(node, ownerID, level, index, value, didAlter) {
        var idx = index >>> level & MASK;
        var nodeHas = node && idx < node.array.length;
        if (!nodeHas && value === void 0) {
          return node;
        }
        var newNode;
        if (level > 0) {
          var lowerNode = node && node.array[idx];
          var newLowerNode = updateVNode(
            lowerNode,
            ownerID,
            level - SHIFT,
            index,
            value,
            didAlter
          );
          if (newLowerNode === lowerNode) {
            return node;
          }
          newNode = editableVNode(node, ownerID);
          newNode.array[idx] = newLowerNode;
          return newNode;
        }
        if (nodeHas && node.array[idx] === value) {
          return node;
        }
        if (didAlter) {
          SetRef(didAlter);
        }
        newNode = editableVNode(node, ownerID);
        if (value === void 0 && idx === newNode.array.length - 1) {
          newNode.array.pop();
        } else {
          newNode.array[idx] = value;
        }
        return newNode;
      }
      function editableVNode(node, ownerID) {
        if (ownerID && node && ownerID === node.ownerID) {
          return node;
        }
        return new VNode(node ? node.array.slice() : [], ownerID);
      }
      function listNodeFor(list, rawIndex) {
        if (rawIndex >= getTailOffset(list._capacity)) {
          return list._tail;
        }
        if (rawIndex < 1 << list._level + SHIFT) {
          var node = list._root;
          var level = list._level;
          while (node && level > 0) {
            node = node.array[rawIndex >>> level & MASK];
            level -= SHIFT;
          }
          return node;
        }
      }
      function setListBounds(list, begin, end) {
        if (begin !== void 0) {
          begin |= 0;
        }
        if (end !== void 0) {
          end |= 0;
        }
        var owner = list.__ownerID || new OwnerID();
        var oldOrigin = list._origin;
        var oldCapacity = list._capacity;
        var newOrigin = oldOrigin + begin;
        var newCapacity = end === void 0 ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
        if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
          return list;
        }
        if (newOrigin >= newCapacity) {
          return list.clear();
        }
        var newLevel = list._level;
        var newRoot = list._root;
        var offsetShift = 0;
        while (newOrigin + offsetShift < 0) {
          newRoot = new VNode(
            newRoot && newRoot.array.length ? [void 0, newRoot] : [],
            owner
          );
          newLevel += SHIFT;
          offsetShift += 1 << newLevel;
        }
        if (offsetShift) {
          newOrigin += offsetShift;
          oldOrigin += offsetShift;
          newCapacity += offsetShift;
          oldCapacity += offsetShift;
        }
        var oldTailOffset = getTailOffset(oldCapacity);
        var newTailOffset = getTailOffset(newCapacity);
        while (newTailOffset >= 1 << newLevel + SHIFT) {
          newRoot = new VNode(
            newRoot && newRoot.array.length ? [newRoot] : [],
            owner
          );
          newLevel += SHIFT;
        }
        var oldTail = list._tail;
        var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;
        if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
          newRoot = editableVNode(newRoot, owner);
          var node = newRoot;
          for (var level = newLevel; level > SHIFT; level -= SHIFT) {
            var idx = oldTailOffset >>> level & MASK;
            node = node.array[idx] = editableVNode(node.array[idx], owner);
          }
          node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
        }
        if (newCapacity < oldCapacity) {
          newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
        }
        if (newOrigin >= newTailOffset) {
          newOrigin -= newTailOffset;
          newCapacity -= newTailOffset;
          newLevel = SHIFT;
          newRoot = null;
          newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);
        } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
          offsetShift = 0;
          while (newRoot) {
            var beginIndex = newOrigin >>> newLevel & MASK;
            if (beginIndex !== newTailOffset >>> newLevel & MASK) {
              break;
            }
            if (beginIndex) {
              offsetShift += (1 << newLevel) * beginIndex;
            }
            newLevel -= SHIFT;
            newRoot = newRoot.array[beginIndex];
          }
          if (newRoot && newOrigin > oldOrigin) {
            newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
          }
          if (newRoot && newTailOffset < oldTailOffset) {
            newRoot = newRoot.removeAfter(
              owner,
              newLevel,
              newTailOffset - offsetShift
            );
          }
          if (offsetShift) {
            newOrigin -= offsetShift;
            newCapacity -= offsetShift;
          }
        }
        if (list.__ownerID) {
          list.size = newCapacity - newOrigin;
          list._origin = newOrigin;
          list._capacity = newCapacity;
          list._level = newLevel;
          list._root = newRoot;
          list._tail = newTail;
          list.__hash = void 0;
          list.__altered = true;
          return list;
        }
        return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
      }
      function getTailOffset(size) {
        return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
      }
      var OrderedMap = /* @__PURE__ */ function(Map3) {
        function OrderedMap2(value) {
          return value === void 0 || value === null ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function(map) {
            var iter = KeyedCollection(value);
            assertNotInfinite(iter.size);
            iter.forEach(function(v, k) {
              return map.set(k, v);
            });
          });
        }
        if (Map3)
          OrderedMap2.__proto__ = Map3;
        OrderedMap2.prototype = Object.create(Map3 && Map3.prototype);
        OrderedMap2.prototype.constructor = OrderedMap2;
        OrderedMap2.of = function of() {
          return this(arguments);
        };
        OrderedMap2.prototype.toString = function toString2() {
          return this.__toString("OrderedMap {", "}");
        };
        OrderedMap2.prototype.get = function get2(k, notSetValue) {
          var index = this._map.get(k);
          return index !== void 0 ? this._list.get(index)[1] : notSetValue;
        };
        OrderedMap2.prototype.clear = function clear() {
          if (this.size === 0) {
            return this;
          }
          if (this.__ownerID) {
            this.size = 0;
            this._map.clear();
            this._list.clear();
            this.__altered = true;
            return this;
          }
          return emptyOrderedMap();
        };
        OrderedMap2.prototype.set = function set2(k, v) {
          return updateOrderedMap(this, k, v);
        };
        OrderedMap2.prototype.remove = function remove2(k) {
          return updateOrderedMap(this, k, NOT_SET);
        };
        OrderedMap2.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          return this._list.__iterate(
            function(entry) {
              return entry && fn(entry[1], entry[0], this$1$1);
            },
            reverse
          );
        };
        OrderedMap2.prototype.__iterator = function __iterator(type, reverse) {
          return this._list.fromEntrySeq().__iterator(type, reverse);
        };
        OrderedMap2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
          if (ownerID === this.__ownerID) {
            return this;
          }
          var newMap = this._map.__ensureOwner(ownerID);
          var newList = this._list.__ensureOwner(ownerID);
          if (!ownerID) {
            if (this.size === 0) {
              return emptyOrderedMap();
            }
            this.__ownerID = ownerID;
            this.__altered = false;
            this._map = newMap;
            this._list = newList;
            return this;
          }
          return makeOrderedMap(newMap, newList, ownerID, this.__hash);
        };
        return OrderedMap2;
      }(Map2);
      OrderedMap.isOrderedMap = isOrderedMap;
      OrderedMap.prototype[IS_ORDERED_SYMBOL] = true;
      OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;
      function makeOrderedMap(map, list, ownerID, hash2) {
        var omap = Object.create(OrderedMap.prototype);
        omap.size = map ? map.size : 0;
        omap._map = map;
        omap._list = list;
        omap.__ownerID = ownerID;
        omap.__hash = hash2;
        omap.__altered = false;
        return omap;
      }
      var EMPTY_ORDERED_MAP;
      function emptyOrderedMap() {
        return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
      }
      function updateOrderedMap(omap, k, v) {
        var map = omap._map;
        var list = omap._list;
        var i = map.get(k);
        var has2 = i !== void 0;
        var newMap;
        var newList;
        if (v === NOT_SET) {
          if (!has2) {
            return omap;
          }
          if (list.size >= SIZE && list.size >= map.size * 2) {
            newList = list.filter(function(entry, idx) {
              return entry !== void 0 && i !== idx;
            });
            newMap = newList.toKeyedSeq().map(function(entry) {
              return entry[0];
            }).flip().toMap();
            if (omap.__ownerID) {
              newMap.__ownerID = newList.__ownerID = omap.__ownerID;
            }
          } else {
            newMap = map.remove(k);
            newList = i === list.size - 1 ? list.pop() : list.set(i, void 0);
          }
        } else if (has2) {
          if (v === list.get(i)[1]) {
            return omap;
          }
          newMap = map;
          newList = list.set(i, [k, v]);
        } else {
          newMap = map.set(k, list.size);
          newList = list.set(list.size, [k, v]);
        }
        if (omap.__ownerID) {
          omap.size = newMap.size;
          omap._map = newMap;
          omap._list = newList;
          omap.__hash = void 0;
          omap.__altered = true;
          return omap;
        }
        return makeOrderedMap(newMap, newList);
      }
      var IS_STACK_SYMBOL = "@@__IMMUTABLE_STACK__@@";
      function isStack(maybeStack) {
        return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
      }
      var Stack = /* @__PURE__ */ function(IndexedCollection2) {
        function Stack2(value) {
          return value === void 0 || value === null ? emptyStack() : isStack(value) ? value : emptyStack().pushAll(value);
        }
        if (IndexedCollection2)
          Stack2.__proto__ = IndexedCollection2;
        Stack2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
        Stack2.prototype.constructor = Stack2;
        Stack2.of = function of() {
          return this(arguments);
        };
        Stack2.prototype.toString = function toString2() {
          return this.__toString("Stack [", "]");
        };
        Stack2.prototype.get = function get2(index, notSetValue) {
          var head = this._head;
          index = wrapIndex(this, index);
          while (head && index--) {
            head = head.next;
          }
          return head ? head.value : notSetValue;
        };
        Stack2.prototype.peek = function peek() {
          return this._head && this._head.value;
        };
        Stack2.prototype.push = function push() {
          var arguments$1 = arguments;
          if (arguments.length === 0) {
            return this;
          }
          var newSize = this.size + arguments.length;
          var head = this._head;
          for (var ii = arguments.length - 1; ii >= 0; ii--) {
            head = {
              value: arguments$1[ii],
              next: head
            };
          }
          if (this.__ownerID) {
            this.size = newSize;
            this._head = head;
            this.__hash = void 0;
            this.__altered = true;
            return this;
          }
          return makeStack(newSize, head);
        };
        Stack2.prototype.pushAll = function pushAll(iter) {
          iter = IndexedCollection2(iter);
          if (iter.size === 0) {
            return this;
          }
          if (this.size === 0 && isStack(iter)) {
            return iter;
          }
          assertNotInfinite(iter.size);
          var newSize = this.size;
          var head = this._head;
          iter.__iterate(
            function(value) {
              newSize++;
              head = {
                value,
                next: head
              };
            },
            /* reverse */
            true
          );
          if (this.__ownerID) {
            this.size = newSize;
            this._head = head;
            this.__hash = void 0;
            this.__altered = true;
            return this;
          }
          return makeStack(newSize, head);
        };
        Stack2.prototype.pop = function pop() {
          return this.slice(1);
        };
        Stack2.prototype.clear = function clear() {
          if (this.size === 0) {
            return this;
          }
          if (this.__ownerID) {
            this.size = 0;
            this._head = void 0;
            this.__hash = void 0;
            this.__altered = true;
            return this;
          }
          return emptyStack();
        };
        Stack2.prototype.slice = function slice(begin, end) {
          if (wholeSlice(begin, end, this.size)) {
            return this;
          }
          var resolvedBegin = resolveBegin(begin, this.size);
          var resolvedEnd = resolveEnd(end, this.size);
          if (resolvedEnd !== this.size) {
            return IndexedCollection2.prototype.slice.call(this, begin, end);
          }
          var newSize = this.size - resolvedBegin;
          var head = this._head;
          while (resolvedBegin--) {
            head = head.next;
          }
          if (this.__ownerID) {
            this.size = newSize;
            this._head = head;
            this.__hash = void 0;
            this.__altered = true;
            return this;
          }
          return makeStack(newSize, head);
        };
        Stack2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
          if (ownerID === this.__ownerID) {
            return this;
          }
          if (!ownerID) {
            if (this.size === 0) {
              return emptyStack();
            }
            this.__ownerID = ownerID;
            this.__altered = false;
            return this;
          }
          return makeStack(this.size, this._head, ownerID, this.__hash);
        };
        Stack2.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          if (reverse) {
            return new ArraySeq(this.toArray()).__iterate(
              function(v, k) {
                return fn(v, k, this$1$1);
              },
              reverse
            );
          }
          var iterations = 0;
          var node = this._head;
          while (node) {
            if (fn(node.value, iterations++, this) === false) {
              break;
            }
            node = node.next;
          }
          return iterations;
        };
        Stack2.prototype.__iterator = function __iterator(type, reverse) {
          if (reverse) {
            return new ArraySeq(this.toArray()).__iterator(type, reverse);
          }
          var iterations = 0;
          var node = this._head;
          return new Iterator(function() {
            if (node) {
              var value = node.value;
              node = node.next;
              return iteratorValue(type, iterations++, value);
            }
            return iteratorDone();
          });
        };
        return Stack2;
      }(IndexedCollection);
      Stack.isStack = isStack;
      var StackPrototype = Stack.prototype;
      StackPrototype[IS_STACK_SYMBOL] = true;
      StackPrototype.shift = StackPrototype.pop;
      StackPrototype.unshift = StackPrototype.push;
      StackPrototype.unshiftAll = StackPrototype.pushAll;
      StackPrototype.withMutations = withMutations;
      StackPrototype.wasAltered = wasAltered;
      StackPrototype.asImmutable = asImmutable;
      StackPrototype["@@transducer/init"] = StackPrototype.asMutable = asMutable;
      StackPrototype["@@transducer/step"] = function(result, arr) {
        return result.unshift(arr);
      };
      StackPrototype["@@transducer/result"] = function(obj) {
        return obj.asImmutable();
      };
      function makeStack(size, head, ownerID, hash2) {
        var map = Object.create(StackPrototype);
        map.size = size;
        map._head = head;
        map.__ownerID = ownerID;
        map.__hash = hash2;
        map.__altered = false;
        return map;
      }
      var EMPTY_STACK;
      function emptyStack() {
        return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
      }
      var IS_SET_SYMBOL = "@@__IMMUTABLE_SET__@@";
      function isSet(maybeSet) {
        return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
      }
      function isOrderedSet(maybeOrderedSet) {
        return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
      }
      function deepEqual(a, b) {
        if (a === b) {
          return true;
        }
        if (!isCollection(b) || a.size !== void 0 && b.size !== void 0 && a.size !== b.size || a.__hash !== void 0 && b.__hash !== void 0 && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
          return false;
        }
        if (a.size === 0 && b.size === 0) {
          return true;
        }
        var notAssociative = !isAssociative(a);
        if (isOrdered(a)) {
          var entries = a.entries();
          return b.every(function(v, k) {
            var entry = entries.next().value;
            return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
          }) && entries.next().done;
        }
        var flipped = false;
        if (a.size === void 0) {
          if (b.size === void 0) {
            if (typeof a.cacheResult === "function") {
              a.cacheResult();
            }
          } else {
            flipped = true;
            var _ = a;
            a = b;
            b = _;
          }
        }
        var allEqual = true;
        var bSize = b.__iterate(function(v, k) {
          if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
            allEqual = false;
            return false;
          }
        });
        return allEqual && a.size === bSize;
      }
      function mixin(ctor, methods) {
        var keyCopier = function(key) {
          ctor.prototype[key] = methods[key];
        };
        Object.keys(methods).forEach(keyCopier);
        Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
        return ctor;
      }
      function toJS(value) {
        if (!value || typeof value !== "object") {
          return value;
        }
        if (!isCollection(value)) {
          if (!isDataStructure(value)) {
            return value;
          }
          value = Seq(value);
        }
        if (isKeyed(value)) {
          var result$1 = {};
          value.__iterate(function(v, k) {
            result$1[k] = toJS(v);
          });
          return result$1;
        }
        var result = [];
        value.__iterate(function(v) {
          result.push(toJS(v));
        });
        return result;
      }
      var Set2 = /* @__PURE__ */ function(SetCollection2) {
        function Set3(value) {
          return value === void 0 || value === null ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function(set2) {
            var iter = SetCollection2(value);
            assertNotInfinite(iter.size);
            iter.forEach(function(v) {
              return set2.add(v);
            });
          });
        }
        if (SetCollection2)
          Set3.__proto__ = SetCollection2;
        Set3.prototype = Object.create(SetCollection2 && SetCollection2.prototype);
        Set3.prototype.constructor = Set3;
        Set3.of = function of() {
          return this(arguments);
        };
        Set3.fromKeys = function fromKeys(value) {
          return this(KeyedCollection(value).keySeq());
        };
        Set3.intersect = function intersect(sets) {
          sets = Collection(sets).toArray();
          return sets.length ? SetPrototype.intersect.apply(Set3(sets.pop()), sets) : emptySet();
        };
        Set3.union = function union(sets) {
          sets = Collection(sets).toArray();
          return sets.length ? SetPrototype.union.apply(Set3(sets.pop()), sets) : emptySet();
        };
        Set3.prototype.toString = function toString2() {
          return this.__toString("Set {", "}");
        };
        Set3.prototype.has = function has2(value) {
          return this._map.has(value);
        };
        Set3.prototype.add = function add(value) {
          return updateSet(this, this._map.set(value, value));
        };
        Set3.prototype.remove = function remove2(value) {
          return updateSet(this, this._map.remove(value));
        };
        Set3.prototype.clear = function clear() {
          return updateSet(this, this._map.clear());
        };
        Set3.prototype.map = function map(mapper, context) {
          var this$1$1 = this;
          var didChanges = false;
          var newMap = updateSet(
            this,
            this._map.mapEntries(function(ref) {
              var v = ref[1];
              var mapped = mapper.call(context, v, v, this$1$1);
              if (mapped !== v) {
                didChanges = true;
              }
              return [mapped, mapped];
            }, context)
          );
          return didChanges ? newMap : this;
        };
        Set3.prototype.union = function union() {
          var iters = [], len = arguments.length;
          while (len--)
            iters[len] = arguments[len];
          iters = iters.filter(function(x) {
            return x.size !== 0;
          });
          if (iters.length === 0) {
            return this;
          }
          if (this.size === 0 && !this.__ownerID && iters.length === 1) {
            return this.constructor(iters[0]);
          }
          return this.withMutations(function(set2) {
            for (var ii = 0; ii < iters.length; ii++) {
              if (typeof iters[ii] === "string") {
                set2.add(iters[ii]);
              } else {
                SetCollection2(iters[ii]).forEach(function(value) {
                  return set2.add(value);
                });
              }
            }
          });
        };
        Set3.prototype.intersect = function intersect() {
          var iters = [], len = arguments.length;
          while (len--)
            iters[len] = arguments[len];
          if (iters.length === 0) {
            return this;
          }
          iters = iters.map(function(iter) {
            return SetCollection2(iter);
          });
          var toRemove = [];
          this.forEach(function(value) {
            if (!iters.every(function(iter) {
              return iter.includes(value);
            })) {
              toRemove.push(value);
            }
          });
          return this.withMutations(function(set2) {
            toRemove.forEach(function(value) {
              set2.remove(value);
            });
          });
        };
        Set3.prototype.subtract = function subtract() {
          var iters = [], len = arguments.length;
          while (len--)
            iters[len] = arguments[len];
          if (iters.length === 0) {
            return this;
          }
          iters = iters.map(function(iter) {
            return SetCollection2(iter);
          });
          var toRemove = [];
          this.forEach(function(value) {
            if (iters.some(function(iter) {
              return iter.includes(value);
            })) {
              toRemove.push(value);
            }
          });
          return this.withMutations(function(set2) {
            toRemove.forEach(function(value) {
              set2.remove(value);
            });
          });
        };
        Set3.prototype.sort = function sort(comparator) {
          return OrderedSet(sortFactory(this, comparator));
        };
        Set3.prototype.sortBy = function sortBy(mapper, comparator) {
          return OrderedSet(sortFactory(this, comparator, mapper));
        };
        Set3.prototype.wasAltered = function wasAltered2() {
          return this._map.wasAltered();
        };
        Set3.prototype.__iterate = function __iterate(fn, reverse) {
          var this$1$1 = this;
          return this._map.__iterate(function(k) {
            return fn(k, k, this$1$1);
          }, reverse);
        };
        Set3.prototype.__iterator = function __iterator(type, reverse) {
          return this._map.__iterator(type, reverse);
        };
        Set3.prototype.__ensureOwner = function __ensureOwner(ownerID) {
          if (ownerID === this.__ownerID) {
            return this;
          }
          var newMap = this._map.__ensureOwner(ownerID);
          if (!ownerID) {
            if (this.size === 0) {
              return this.__empty();
            }
            this.__ownerID = ownerID;
            this._map = newMap;
            return this;
          }
          return this.__make(newMap, ownerID);
        };
        return Set3;
      }(SetCollection);
      Set2.isSet = isSet;
      var SetPrototype = Set2.prototype;
      SetPrototype[IS_SET_SYMBOL] = true;
      SetPrototype[DELETE] = SetPrototype.remove;
      SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
      SetPrototype.withMutations = withMutations;
      SetPrototype.asImmutable = asImmutable;
      SetPrototype["@@transducer/init"] = SetPrototype.asMutable = asMutable;
      SetPrototype["@@transducer/step"] = function(result, arr) {
        return result.add(arr);
      };
      SetPrototype["@@transducer/result"] = function(obj) {
        return obj.asImmutable();
      };
      SetPrototype.__empty = emptySet;
      SetPrototype.__make = makeSet;
      function updateSet(set2, newMap) {
        if (set2.__ownerID) {
          set2.size = newMap.size;
          set2._map = newMap;
          return set2;
        }
        return newMap === set2._map ? set2 : newMap.size === 0 ? set2.__empty() : set2.__make(newMap);
      }
      function makeSet(map, ownerID) {
        var set2 = Object.create(SetPrototype);
        set2.size = map ? map.size : 0;
        set2._map = map;
        set2.__ownerID = ownerID;
        return set2;
      }
      var EMPTY_SET;
      function emptySet() {
        return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
      }
      var Range = /* @__PURE__ */ function(IndexedSeq2) {
        function Range2(start, end, step) {
          if (step === void 0)
            step = 1;
          if (!(this instanceof Range2)) {
            return new Range2(start, end, step);
          }
          invariant(step !== 0, "Cannot step a Range by 0");
          invariant(
            start !== void 0,
            "You must define a start value when using Range"
          );
          invariant(
            end !== void 0,
            "You must define an end value when using Range"
          );
          step = Math.abs(step);
          if (end < start) {
            step = -step;
          }
          this._start = start;
          this._end = end;
          this._step = step;
          this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
          if (this.size === 0) {
            if (EMPTY_RANGE) {
              return EMPTY_RANGE;
            }
            EMPTY_RANGE = this;
          }
        }
        if (IndexedSeq2)
          Range2.__proto__ = IndexedSeq2;
        Range2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
        Range2.prototype.constructor = Range2;
        Range2.prototype.toString = function toString2() {
          if (this.size === 0) {
            return "Range []";
          }
          return "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
        };
        Range2.prototype.get = function get2(index, notSetValue) {
          return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
        };
        Range2.prototype.includes = function includes(searchValue) {
          var possibleIndex = (searchValue - this._start) / this._step;
          return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
        };
        Range2.prototype.slice = function slice(begin, end) {
          if (wholeSlice(begin, end, this.size)) {
            return this;
          }
          begin = resolveBegin(begin, this.size);
          end = resolveEnd(end, this.size);
          if (end <= begin) {
            return new Range2(0, 0);
          }
          return new Range2(
            this.get(begin, this._end),
            this.get(end, this._end),
            this._step
          );
        };
        Range2.prototype.indexOf = function indexOf(searchValue) {
          var offsetValue = searchValue - this._start;
          if (offsetValue % this._step === 0) {
            var index = offsetValue / this._step;
            if (index >= 0 && index < this.size) {
              return index;
            }
          }
          return -1;
        };
        Range2.prototype.lastIndexOf = function lastIndexOf(searchValue) {
          return this.indexOf(searchValue);
        };
        Range2.prototype.__iterate = function __iterate(fn, reverse) {
          var size = this.size;
          var step = this._step;
          var value = reverse ? this._start + (size - 1) * step : this._start;
          var i = 0;
          while (i !== size) {
            if (fn(value, reverse ? size - ++i : i++, this) === false) {
              break;
            }
            value += reverse ? -step : step;
          }
          return i;
        };
        Range2.prototype.__iterator = function __iterator(type, reverse) {
          var size = this.size;
          var step = this._step;
          var value = reverse ? this._start + (size - 1) * step : this._start;
          var i = 0;
          return new Iterator(function() {
            if (i === size) {
              return iteratorDone();
            }
            var v = value;
            value += reverse ? -step : step;
            return iteratorValue(type, reverse ? size - ++i : i++, v);
          });
        };
        Range2.prototype.equals = function equals(other) {
          return other instanceof Range2 ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
        };
        return Range2;
      }(IndexedSeq);
      var EMPTY_RANGE;
      function getIn$1(collection, searchKeyPath, notSetValue) {
        var keyPath = coerceKeyPath(searchKeyPath);
        var i = 0;
        while (i !== keyPath.length) {
          collection = get(collection, keyPath[i++], NOT_SET);
          if (collection === NOT_SET) {
            return notSetValue;
          }
        }
        return collection;
      }
      function getIn(searchKeyPath, notSetValue) {
        return getIn$1(this, searchKeyPath, notSetValue);
      }
      function hasIn$1(collection, keyPath) {
        return getIn$1(collection, keyPath, NOT_SET) !== NOT_SET;
      }
      function hasIn(searchKeyPath) {
        return hasIn$1(this, searchKeyPath);
      }
      function toObject() {
        assertNotInfinite(this.size);
        var object = {};
        this.__iterate(function(v, k) {
          object[k] = v;
        });
        return object;
      }
      Collection.Iterator = Iterator;
      mixin(Collection, {
        // ### Conversion to other types
        toArray: function toArray() {
          assertNotInfinite(this.size);
          var array = new Array(this.size || 0);
          var useTuples = isKeyed(this);
          var i = 0;
          this.__iterate(function(v, k) {
            array[i++] = useTuples ? [k, v] : v;
          });
          return array;
        },
        toIndexedSeq: function toIndexedSeq() {
          return new ToIndexedSequence(this);
        },
        toJS: function toJS$1() {
          return toJS(this);
        },
        toKeyedSeq: function toKeyedSeq() {
          return new ToKeyedSequence(this, true);
        },
        toMap: function toMap() {
          return Map2(this.toKeyedSeq());
        },
        toObject,
        toOrderedMap: function toOrderedMap() {
          return OrderedMap(this.toKeyedSeq());
        },
        toOrderedSet: function toOrderedSet() {
          return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
        },
        toSet: function toSet() {
          return Set2(isKeyed(this) ? this.valueSeq() : this);
        },
        toSetSeq: function toSetSeq() {
          return new ToSetSequence(this);
        },
        toSeq: function toSeq() {
          return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
        },
        toStack: function toStack() {
          return Stack(isKeyed(this) ? this.valueSeq() : this);
        },
        toList: function toList() {
          return List(isKeyed(this) ? this.valueSeq() : this);
        },
        // ### Common JavaScript methods and properties
        toString: function toString2() {
          return "[Collection]";
        },
        __toString: function __toString(head, tail) {
          if (this.size === 0) {
            return head + tail;
          }
          return head + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + tail;
        },
        // ### ES6 Collection methods (ES6 Array and Map)
        concat: function concat() {
          var values = [], len = arguments.length;
          while (len--)
            values[len] = arguments[len];
          return reify(this, concatFactory(this, values));
        },
        includes: function includes(searchValue) {
          return this.some(function(value) {
            return is(value, searchValue);
          });
        },
        entries: function entries() {
          return this.__iterator(ITERATE_ENTRIES);
        },
        every: function every(predicate, context) {
          assertNotInfinite(this.size);
          var returnValue = true;
          this.__iterate(function(v, k, c) {
            if (!predicate.call(context, v, k, c)) {
              returnValue = false;
              return false;
            }
          });
          return returnValue;
        },
        filter: function filter(predicate, context) {
          return reify(this, filterFactory(this, predicate, context, true));
        },
        partition: function partition(predicate, context) {
          return partitionFactory(this, predicate, context);
        },
        find: function find(predicate, context, notSetValue) {
          var entry = this.findEntry(predicate, context);
          return entry ? entry[1] : notSetValue;
        },
        forEach: function forEach(sideEffect, context) {
          assertNotInfinite(this.size);
          return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
        },
        join: function join(separator) {
          assertNotInfinite(this.size);
          separator = separator !== void 0 ? "" + separator : ",";
          var joined = "";
          var isFirst = true;
          this.__iterate(function(v) {
            isFirst ? isFirst = false : joined += separator;
            joined += v !== null && v !== void 0 ? v.toString() : "";
          });
          return joined;
        },
        keys: function keys() {
          return this.__iterator(ITERATE_KEYS);
        },
        map: function map(mapper, context) {
          return reify(this, mapFactory(this, mapper, context));
        },
        reduce: function reduce$1(reducer, initialReduction, context) {
          return reduce(
            this,
            reducer,
            initialReduction,
            context,
            arguments.length < 2,
            false
          );
        },
        reduceRight: function reduceRight(reducer, initialReduction, context) {
          return reduce(
            this,
            reducer,
            initialReduction,
            context,
            arguments.length < 2,
            true
          );
        },
        reverse: function reverse() {
          return reify(this, reverseFactory(this, true));
        },
        slice: function slice(begin, end) {
          return reify(this, sliceFactory(this, begin, end, true));
        },
        some: function some(predicate, context) {
          assertNotInfinite(this.size);
          var returnValue = false;
          this.__iterate(function(v, k, c) {
            if (predicate.call(context, v, k, c)) {
              returnValue = true;
              return false;
            }
          });
          return returnValue;
        },
        sort: function sort(comparator) {
          return reify(this, sortFactory(this, comparator));
        },
        values: function values() {
          return this.__iterator(ITERATE_VALUES);
        },
        // ### More sequential methods
        butLast: function butLast() {
          return this.slice(0, -1);
        },
        isEmpty: function isEmpty() {
          return this.size !== void 0 ? this.size === 0 : !this.some(function() {
            return true;
          });
        },
        count: function count(predicate, context) {
          return ensureSize(
            predicate ? this.toSeq().filter(predicate, context) : this
          );
        },
        countBy: function countBy(grouper, context) {
          return countByFactory(this, grouper, context);
        },
        equals: function equals(other) {
          return deepEqual(this, other);
        },
        entrySeq: function entrySeq() {
          var collection = this;
          if (collection._cache) {
            return new ArraySeq(collection._cache);
          }
          var entriesSequence = collection.toSeq().map(entryMapper).toIndexedSeq();
          entriesSequence.fromEntrySeq = function() {
            return collection.toSeq();
          };
          return entriesSequence;
        },
        filterNot: function filterNot(predicate, context) {
          return this.filter(not(predicate), context);
        },
        findEntry: function findEntry(predicate, context, notSetValue) {
          var found = notSetValue;
          this.__iterate(function(v, k, c) {
            if (predicate.call(context, v, k, c)) {
              found = [k, v];
              return false;
            }
          });
          return found;
        },
        findKey: function findKey(predicate, context) {
          var entry = this.findEntry(predicate, context);
          return entry && entry[0];
        },
        findLast: function findLast(predicate, context, notSetValue) {
          return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
        },
        findLastEntry: function findLastEntry(predicate, context, notSetValue) {
          return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
        },
        findLastKey: function findLastKey(predicate, context) {
          return this.toKeyedSeq().reverse().findKey(predicate, context);
        },
        first: function first(notSetValue) {
          return this.find(returnTrue, null, notSetValue);
        },
        flatMap: function flatMap(mapper, context) {
          return reify(this, flatMapFactory(this, mapper, context));
        },
        flatten: function flatten(depth) {
          return reify(this, flattenFactory(this, depth, true));
        },
        fromEntrySeq: function fromEntrySeq() {
          return new FromEntriesSequence(this);
        },
        get: function get2(searchKey, notSetValue) {
          return this.find(function(_, key) {
            return is(key, searchKey);
          }, void 0, notSetValue);
        },
        getIn,
        groupBy: function groupBy(grouper, context) {
          return groupByFactory(this, grouper, context);
        },
        has: function has2(searchKey) {
          return this.get(searchKey, NOT_SET) !== NOT_SET;
        },
        hasIn,
        isSubset: function isSubset(iter) {
          iter = typeof iter.includes === "function" ? iter : Collection(iter);
          return this.every(function(value) {
            return iter.includes(value);
          });
        },
        isSuperset: function isSuperset(iter) {
          iter = typeof iter.isSubset === "function" ? iter : Collection(iter);
          return iter.isSubset(this);
        },
        keyOf: function keyOf(searchValue) {
          return this.findKey(function(value) {
            return is(value, searchValue);
          });
        },
        keySeq: function keySeq() {
          return this.toSeq().map(keyMapper).toIndexedSeq();
        },
        last: function last(notSetValue) {
          return this.toSeq().reverse().first(notSetValue);
        },
        lastKeyOf: function lastKeyOf(searchValue) {
          return this.toKeyedSeq().reverse().keyOf(searchValue);
        },
        max: function max(comparator) {
          return maxFactory(this, comparator);
        },
        maxBy: function maxBy(mapper, comparator) {
          return maxFactory(this, comparator, mapper);
        },
        min: function min(comparator) {
          return maxFactory(
            this,
            comparator ? neg(comparator) : defaultNegComparator
          );
        },
        minBy: function minBy(mapper, comparator) {
          return maxFactory(
            this,
            comparator ? neg(comparator) : defaultNegComparator,
            mapper
          );
        },
        rest: function rest() {
          return this.slice(1);
        },
        skip: function skip(amount) {
          return amount === 0 ? this : this.slice(Math.max(0, amount));
        },
        skipLast: function skipLast(amount) {
          return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
        },
        skipWhile: function skipWhile(predicate, context) {
          return reify(this, skipWhileFactory(this, predicate, context, true));
        },
        skipUntil: function skipUntil(predicate, context) {
          return this.skipWhile(not(predicate), context);
        },
        sortBy: function sortBy(mapper, comparator) {
          return reify(this, sortFactory(this, comparator, mapper));
        },
        take: function take(amount) {
          return this.slice(0, Math.max(0, amount));
        },
        takeLast: function takeLast(amount) {
          return this.slice(-Math.max(0, amount));
        },
        takeWhile: function takeWhile(predicate, context) {
          return reify(this, takeWhileFactory(this, predicate, context));
        },
        takeUntil: function takeUntil(predicate, context) {
          return this.takeWhile(not(predicate), context);
        },
        update: function update2(fn) {
          return fn(this);
        },
        valueSeq: function valueSeq() {
          return this.toIndexedSeq();
        },
        // ### Hashable Object
        hashCode: function hashCode() {
          return this.__hash || (this.__hash = hashCollection(this));
        }
        // ### Internal
        // abstract __iterate(fn, reverse)
        // abstract __iterator(type, reverse)
      });
      var CollectionPrototype = Collection.prototype;
      CollectionPrototype[IS_COLLECTION_SYMBOL] = true;
      CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
      CollectionPrototype.toJSON = CollectionPrototype.toArray;
      CollectionPrototype.__toStringMapper = quoteString;
      CollectionPrototype.inspect = CollectionPrototype.toSource = function() {
        return this.toString();
      };
      CollectionPrototype.chain = CollectionPrototype.flatMap;
      CollectionPrototype.contains = CollectionPrototype.includes;
      mixin(KeyedCollection, {
        // ### More sequential methods
        flip: function flip() {
          return reify(this, flipFactory(this));
        },
        mapEntries: function mapEntries(mapper, context) {
          var this$1$1 = this;
          var iterations = 0;
          return reify(
            this,
            this.toSeq().map(function(v, k) {
              return mapper.call(context, [k, v], iterations++, this$1$1);
            }).fromEntrySeq()
          );
        },
        mapKeys: function mapKeys(mapper, context) {
          var this$1$1 = this;
          return reify(
            this,
            this.toSeq().flip().map(function(k, v) {
              return mapper.call(context, k, v, this$1$1);
            }).flip()
          );
        }
      });
      var KeyedCollectionPrototype = KeyedCollection.prototype;
      KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
      KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
      KeyedCollectionPrototype.toJSON = toObject;
      KeyedCollectionPrototype.__toStringMapper = function(v, k) {
        return quoteString(k) + ": " + quoteString(v);
      };
      mixin(IndexedCollection, {
        // ### Conversion to other types
        toKeyedSeq: function toKeyedSeq() {
          return new ToKeyedSequence(this, false);
        },
        // ### ES6 Collection methods (ES6 Array and Map)
        filter: function filter(predicate, context) {
          return reify(this, filterFactory(this, predicate, context, false));
        },
        findIndex: function findIndex(predicate, context) {
          var entry = this.findEntry(predicate, context);
          return entry ? entry[0] : -1;
        },
        indexOf: function indexOf(searchValue) {
          var key = this.keyOf(searchValue);
          return key === void 0 ? -1 : key;
        },
        lastIndexOf: function lastIndexOf(searchValue) {
          var key = this.lastKeyOf(searchValue);
          return key === void 0 ? -1 : key;
        },
        reverse: function reverse() {
          return reify(this, reverseFactory(this, false));
        },
        slice: function slice(begin, end) {
          return reify(this, sliceFactory(this, begin, end, false));
        },
        splice: function splice(index, removeNum) {
          var numArgs = arguments.length;
          removeNum = Math.max(removeNum || 0, 0);
          if (numArgs === 0 || numArgs === 2 && !removeNum) {
            return this;
          }
          index = resolveBegin(index, index < 0 ? this.count() : this.size);
          var spliced = this.slice(0, index);
          return reify(
            this,
            numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
          );
        },
        // ### More collection methods
        findLastIndex: function findLastIndex(predicate, context) {
          var entry = this.findLastEntry(predicate, context);
          return entry ? entry[0] : -1;
        },
        first: function first(notSetValue) {
          return this.get(0, notSetValue);
        },
        flatten: function flatten(depth) {
          return reify(this, flattenFactory(this, depth, false));
        },
        get: function get2(index, notSetValue) {
          index = wrapIndex(this, index);
          return index < 0 || this.size === Infinity || this.size !== void 0 && index > this.size ? notSetValue : this.find(function(_, key) {
            return key === index;
          }, void 0, notSetValue);
        },
        has: function has2(index) {
          index = wrapIndex(this, index);
          return index >= 0 && (this.size !== void 0 ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
        },
        interpose: function interpose(separator) {
          return reify(this, interposeFactory(this, separator));
        },
        interleave: function interleave() {
          var collections = [this].concat(arrCopy(arguments));
          var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
          var interleaved = zipped.flatten(true);
          if (zipped.size) {
            interleaved.size = zipped.size * collections.length;
          }
          return reify(this, interleaved);
        },
        keySeq: function keySeq() {
          return Range(0, this.size);
        },
        last: function last(notSetValue) {
          return this.get(-1, notSetValue);
        },
        skipWhile: function skipWhile(predicate, context) {
          return reify(this, skipWhileFactory(this, predicate, context, false));
        },
        zip: function zip() {
          var collections = [this].concat(arrCopy(arguments));
          return reify(this, zipWithFactory(this, defaultZipper, collections));
        },
        zipAll: function zipAll() {
          var collections = [this].concat(arrCopy(arguments));
          return reify(this, zipWithFactory(this, defaultZipper, collections, true));
        },
        zipWith: function zipWith(zipper) {
          var collections = arrCopy(arguments);
          collections[0] = this;
          return reify(this, zipWithFactory(this, zipper, collections));
        }
      });
      var IndexedCollectionPrototype = IndexedCollection.prototype;
      IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
      IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;
      mixin(SetCollection, {
        // ### ES6 Collection methods (ES6 Array and Map)
        get: function get2(value, notSetValue) {
          return this.has(value) ? value : notSetValue;
        },
        includes: function includes(value) {
          return this.has(value);
        },
        // ### More sequential methods
        keySeq: function keySeq() {
          return this.valueSeq();
        }
      });
      var SetCollectionPrototype = SetCollection.prototype;
      SetCollectionPrototype.has = CollectionPrototype.includes;
      SetCollectionPrototype.contains = SetCollectionPrototype.includes;
      SetCollectionPrototype.keys = SetCollectionPrototype.values;
      mixin(KeyedSeq, KeyedCollectionPrototype);
      mixin(IndexedSeq, IndexedCollectionPrototype);
      mixin(SetSeq, SetCollectionPrototype);
      function reduce(collection, reducer, reduction, context, useFirst, reverse) {
        assertNotInfinite(collection.size);
        collection.__iterate(function(v, k, c) {
          if (useFirst) {
            useFirst = false;
            reduction = v;
          } else {
            reduction = reducer.call(context, reduction, v, k, c);
          }
        }, reverse);
        return reduction;
      }
      function keyMapper(v, k) {
        return k;
      }
      function entryMapper(v, k) {
        return [k, v];
      }
      function not(predicate) {
        return function() {
          return !predicate.apply(this, arguments);
        };
      }
      function neg(predicate) {
        return function() {
          return -predicate.apply(this, arguments);
        };
      }
      function defaultZipper() {
        return arrCopy(arguments);
      }
      function defaultNegComparator(a, b) {
        return a < b ? 1 : a > b ? -1 : 0;
      }
      function hashCollection(collection) {
        if (collection.size === Infinity) {
          return 0;
        }
        var ordered = isOrdered(collection);
        var keyed = isKeyed(collection);
        var h = ordered ? 1 : 0;
        collection.__iterate(
          keyed ? ordered ? function(v, k) {
            h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
          } : function(v, k) {
            h = h + hashMerge(hash(v), hash(k)) | 0;
          } : ordered ? function(v) {
            h = 31 * h + hash(v) | 0;
          } : function(v) {
            h = h + hash(v) | 0;
          }
        );
        return murmurHashOfSize(collection.size, h);
      }
      function murmurHashOfSize(size, h) {
        h = imul(h, 3432918353);
        h = imul(h << 15 | h >>> -15, 461845907);
        h = imul(h << 13 | h >>> -13, 5);
        h = (h + 3864292196 | 0) ^ size;
        h = imul(h ^ h >>> 16, 2246822507);
        h = imul(h ^ h >>> 13, 3266489909);
        h = smi(h ^ h >>> 16);
        return h;
      }
      function hashMerge(a, b) {
        return a ^ b + 2654435769 + (a << 6) + (a >> 2) | 0;
      }
      var OrderedSet = /* @__PURE__ */ function(Set3) {
        function OrderedSet2(value) {
          return value === void 0 || value === null ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function(set2) {
            var iter = SetCollection(value);
            assertNotInfinite(iter.size);
            iter.forEach(function(v) {
              return set2.add(v);
            });
          });
        }
        if (Set3)
          OrderedSet2.__proto__ = Set3;
        OrderedSet2.prototype = Object.create(Set3 && Set3.prototype);
        OrderedSet2.prototype.constructor = OrderedSet2;
        OrderedSet2.of = function of() {
          return this(arguments);
        };
        OrderedSet2.fromKeys = function fromKeys(value) {
          return this(KeyedCollection(value).keySeq());
        };
        OrderedSet2.prototype.toString = function toString2() {
          return this.__toString("OrderedSet {", "}");
        };
        return OrderedSet2;
      }(Set2);
      OrderedSet.isOrderedSet = isOrderedSet;
      var OrderedSetPrototype = OrderedSet.prototype;
      OrderedSetPrototype[IS_ORDERED_SYMBOL] = true;
      OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
      OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;
      OrderedSetPrototype.zipAll = IndexedCollectionPrototype.zipAll;
      OrderedSetPrototype.__empty = emptyOrderedSet;
      OrderedSetPrototype.__make = makeOrderedSet;
      function makeOrderedSet(map, ownerID) {
        var set2 = Object.create(OrderedSetPrototype);
        set2.size = map ? map.size : 0;
        set2._map = map;
        set2.__ownerID = ownerID;
        return set2;
      }
      var EMPTY_ORDERED_SET;
      function emptyOrderedSet() {
        return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
      }
      var PairSorting = {
        LeftThenRight: -1,
        RightThenLeft: 1
      };
      function throwOnInvalidDefaultValues(defaultValues) {
        if (isRecord(defaultValues)) {
          throw new Error(
            "Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead."
          );
        }
        if (isImmutable(defaultValues)) {
          throw new Error(
            "Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead."
          );
        }
        if (defaultValues === null || typeof defaultValues !== "object") {
          throw new Error(
            "Can not call `Record` with a non-object as default values. Use a plain javascript object instead."
          );
        }
      }
      var Record2 = function Record3(defaultValues, name) {
        var hasInitialized;
        throwOnInvalidDefaultValues(defaultValues);
        var RecordType = function Record4(values) {
          var this$1$1 = this;
          if (values instanceof RecordType) {
            return values;
          }
          if (!(this instanceof RecordType)) {
            return new RecordType(values);
          }
          if (!hasInitialized) {
            hasInitialized = true;
            var keys = Object.keys(defaultValues);
            var indices = RecordTypePrototype._indices = {};
            RecordTypePrototype._name = name;
            RecordTypePrototype._keys = keys;
            RecordTypePrototype._defaultValues = defaultValues;
            for (var i = 0; i < keys.length; i++) {
              var propName = keys[i];
              indices[propName] = i;
              if (RecordTypePrototype[propName]) {
                typeof console === "object" && console.warn && console.warn(
                  "Cannot define " + recordName(this) + ' with property "' + propName + '" since that property name is part of the Record API.'
                );
              } else {
                setProp(RecordTypePrototype, propName);
              }
            }
          }
          this.__ownerID = void 0;
          this._values = List().withMutations(function(l) {
            l.setSize(this$1$1._keys.length);
            KeyedCollection(values).forEach(function(v, k) {
              l.set(this$1$1._indices[k], v === this$1$1._defaultValues[k] ? void 0 : v);
            });
          });
          return this;
        };
        var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
        RecordTypePrototype.constructor = RecordType;
        if (name) {
          RecordType.displayName = name;
        }
        return RecordType;
      };
      Record2.prototype.toString = function toString2() {
        var str = recordName(this) + " { ";
        var keys = this._keys;
        var k;
        for (var i = 0, l = keys.length; i !== l; i++) {
          k = keys[i];
          str += (i ? ", " : "") + k + ": " + quoteString(this.get(k));
        }
        return str + " }";
      };
      Record2.prototype.equals = function equals(other) {
        return this === other || isRecord(other) && recordSeq(this).equals(recordSeq(other));
      };
      Record2.prototype.hashCode = function hashCode() {
        return recordSeq(this).hashCode();
      };
      Record2.prototype.has = function has2(k) {
        return this._indices.hasOwnProperty(k);
      };
      Record2.prototype.get = function get2(k, notSetValue) {
        if (!this.has(k)) {
          return notSetValue;
        }
        var index = this._indices[k];
        var value = this._values.get(index);
        return value === void 0 ? this._defaultValues[k] : value;
      };
      Record2.prototype.set = function set2(k, v) {
        if (this.has(k)) {
          var newValues = this._values.set(
            this._indices[k],
            v === this._defaultValues[k] ? void 0 : v
          );
          if (newValues !== this._values && !this.__ownerID) {
            return makeRecord(this, newValues);
          }
        }
        return this;
      };
      Record2.prototype.remove = function remove2(k) {
        return this.set(k);
      };
      Record2.prototype.clear = function clear() {
        var newValues = this._values.clear().setSize(this._keys.length);
        return this.__ownerID ? this : makeRecord(this, newValues);
      };
      Record2.prototype.wasAltered = function wasAltered2() {
        return this._values.wasAltered();
      };
      Record2.prototype.toSeq = function toSeq() {
        return recordSeq(this);
      };
      Record2.prototype.toJS = function toJS$1() {
        return toJS(this);
      };
      Record2.prototype.entries = function entries() {
        return this.__iterator(ITERATE_ENTRIES);
      };
      Record2.prototype.__iterator = function __iterator(type, reverse) {
        return recordSeq(this).__iterator(type, reverse);
      };
      Record2.prototype.__iterate = function __iterate(fn, reverse) {
        return recordSeq(this).__iterate(fn, reverse);
      };
      Record2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        var newValues = this._values.__ensureOwner(ownerID);
        if (!ownerID) {
          this.__ownerID = ownerID;
          this._values = newValues;
          return this;
        }
        return makeRecord(this, newValues, ownerID);
      };
      Record2.isRecord = isRecord;
      Record2.getDescriptiveName = recordName;
      var RecordPrototype = Record2.prototype;
      RecordPrototype[IS_RECORD_SYMBOL] = true;
      RecordPrototype[DELETE] = RecordPrototype.remove;
      RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
      RecordPrototype.getIn = getIn;
      RecordPrototype.hasIn = CollectionPrototype.hasIn;
      RecordPrototype.merge = merge$1;
      RecordPrototype.mergeWith = mergeWith$1;
      RecordPrototype.mergeIn = mergeIn;
      RecordPrototype.mergeDeep = mergeDeep;
      RecordPrototype.mergeDeepWith = mergeDeepWith;
      RecordPrototype.mergeDeepIn = mergeDeepIn;
      RecordPrototype.setIn = setIn;
      RecordPrototype.update = update;
      RecordPrototype.updateIn = updateIn;
      RecordPrototype.withMutations = withMutations;
      RecordPrototype.asMutable = asMutable;
      RecordPrototype.asImmutable = asImmutable;
      RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
      RecordPrototype.toJSON = RecordPrototype.toObject = CollectionPrototype.toObject;
      RecordPrototype.inspect = RecordPrototype.toSource = function() {
        return this.toString();
      };
      function makeRecord(likeRecord, values, ownerID) {
        var record = Object.create(Object.getPrototypeOf(likeRecord));
        record._values = values;
        record.__ownerID = ownerID;
        return record;
      }
      function recordName(record) {
        return record.constructor.displayName || record.constructor.name || "Record";
      }
      function recordSeq(record) {
        return keyedSeqFromValue(record._keys.map(function(k) {
          return [k, record.get(k)];
        }));
      }
      function setProp(prototype, name) {
        try {
          Object.defineProperty(prototype, name, {
            get: function() {
              return this.get(name);
            },
            set: function(value) {
              invariant(this.__ownerID, "Cannot set on an immutable record.");
              this.set(name, value);
            }
          });
        } catch (error) {
        }
      }
      var Repeat = /* @__PURE__ */ function(IndexedSeq2) {
        function Repeat2(value, times) {
          if (!(this instanceof Repeat2)) {
            return new Repeat2(value, times);
          }
          this._value = value;
          this.size = times === void 0 ? Infinity : Math.max(0, times);
          if (this.size === 0) {
            if (EMPTY_REPEAT) {
              return EMPTY_REPEAT;
            }
            EMPTY_REPEAT = this;
          }
        }
        if (IndexedSeq2)
          Repeat2.__proto__ = IndexedSeq2;
        Repeat2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
        Repeat2.prototype.constructor = Repeat2;
        Repeat2.prototype.toString = function toString2() {
          if (this.size === 0) {
            return "Repeat []";
          }
          return "Repeat [ " + this._value + " " + this.size + " times ]";
        };
        Repeat2.prototype.get = function get2(index, notSetValue) {
          return this.has(index) ? this._value : notSetValue;
        };
        Repeat2.prototype.includes = function includes(searchValue) {
          return is(this._value, searchValue);
        };
        Repeat2.prototype.slice = function slice(begin, end) {
          var size = this.size;
          return wholeSlice(begin, end, size) ? this : new Repeat2(
            this._value,
            resolveEnd(end, size) - resolveBegin(begin, size)
          );
        };
        Repeat2.prototype.reverse = function reverse() {
          return this;
        };
        Repeat2.prototype.indexOf = function indexOf(searchValue) {
          if (is(this._value, searchValue)) {
            return 0;
          }
          return -1;
        };
        Repeat2.prototype.lastIndexOf = function lastIndexOf(searchValue) {
          if (is(this._value, searchValue)) {
            return this.size;
          }
          return -1;
        };
        Repeat2.prototype.__iterate = function __iterate(fn, reverse) {
          var size = this.size;
          var i = 0;
          while (i !== size) {
            if (fn(this._value, reverse ? size - ++i : i++, this) === false) {
              break;
            }
          }
          return i;
        };
        Repeat2.prototype.__iterator = function __iterator(type, reverse) {
          var this$1$1 = this;
          var size = this.size;
          var i = 0;
          return new Iterator(
            function() {
              return i === size ? iteratorDone() : iteratorValue(type, reverse ? size - ++i : i++, this$1$1._value);
            }
          );
        };
        Repeat2.prototype.equals = function equals(other) {
          return other instanceof Repeat2 ? is(this._value, other._value) : deepEqual(this, other);
        };
        return Repeat2;
      }(IndexedSeq);
      var EMPTY_REPEAT;
      function fromJS(value, converter) {
        return fromJSWith(
          [],
          converter || defaultConverter,
          value,
          "",
          converter && converter.length > 2 ? [] : void 0,
          { "": value }
        );
      }
      function fromJSWith(stack, converter, value, key, keyPath, parentValue) {
        if (typeof value !== "string" && !isImmutable(value) && (isArrayLike(value) || hasIterator(value) || isPlainObject(value))) {
          if (~stack.indexOf(value)) {
            throw new TypeError("Cannot convert circular structure to Immutable");
          }
          stack.push(value);
          keyPath && key !== "" && keyPath.push(key);
          var converted = converter.call(
            parentValue,
            key,
            Seq(value).map(
              function(v, k) {
                return fromJSWith(stack, converter, v, k, keyPath, value);
              }
            ),
            keyPath && keyPath.slice()
          );
          stack.pop();
          keyPath && keyPath.pop();
          return converted;
        }
        return value;
      }
      function defaultConverter(k, v) {
        return isIndexed(v) ? v.toList() : isKeyed(v) ? v.toMap() : v.toSet();
      }
      var version = "5.0.3";
      var Iterable = Collection;
      exports3.Collection = Collection;
      exports3.Iterable = Iterable;
      exports3.List = List;
      exports3.Map = Map2;
      exports3.OrderedMap = OrderedMap;
      exports3.OrderedSet = OrderedSet;
      exports3.PairSorting = PairSorting;
      exports3.Range = Range;
      exports3.Record = Record2;
      exports3.Repeat = Repeat;
      exports3.Seq = Seq;
      exports3.Set = Set2;
      exports3.Stack = Stack;
      exports3.fromJS = fromJS;
      exports3.get = get;
      exports3.getIn = getIn$1;
      exports3.has = has;
      exports3.hasIn = hasIn$1;
      exports3.hash = hash;
      exports3.is = is;
      exports3.isAssociative = isAssociative;
      exports3.isCollection = isCollection;
      exports3.isImmutable = isImmutable;
      exports3.isIndexed = isIndexed;
      exports3.isKeyed = isKeyed;
      exports3.isList = isList;
      exports3.isMap = isMap;
      exports3.isOrdered = isOrdered;
      exports3.isOrderedMap = isOrderedMap;
      exports3.isOrderedSet = isOrderedSet;
      exports3.isPlainObject = isPlainObject;
      exports3.isRecord = isRecord;
      exports3.isSeq = isSeq;
      exports3.isSet = isSet;
      exports3.isStack = isStack;
      exports3.isValueObject = isValueObject;
      exports3.merge = merge;
      exports3.mergeDeep = mergeDeep$1;
      exports3.mergeDeepWith = mergeDeepWith$1;
      exports3.mergeWith = mergeWith;
      exports3.remove = remove;
      exports3.removeIn = removeIn;
      exports3.set = set;
      exports3.setIn = setIn$1;
      exports3.update = update$1;
      exports3.updateIn = updateIn$1;
      exports3.version = version;
    });
  }
});

// node_modules/commander/esm.mjs
var import_index = __toESM(require_commander(), 1);
var {
  program,
  createCommand,
  createArgument,
  createOption,
  CommanderError,
  InvalidArgumentError,
  InvalidOptionArgumentError,
  // deprecated old name
  Command,
  Argument,
  Option,
  Help
} = import_index.default;

// cli.ts
var import_fs = require("fs");
var import_path = require("path");
var import_worker_threads = require("worker_threads");
var import_os = require("os");

// ../uma-tools/components/HorseDefTypes.ts
var import_immutable = __toESM(require_immutable());

// ../uma-tools/umalator-global/skill_meta.json
var skill_meta_default = { "100011": { baseCost: 0, groupId: "10001", iconId: "20013", order: 10 }, "100021": { baseCost: 0, groupId: "10002", iconId: "20013", order: 10 }, "100031": { baseCost: 0, groupId: "10003", iconId: "20013", order: 10 }, "100041": { baseCost: 0, groupId: "10004", iconId: "20043", order: 10 }, "100051": { baseCost: 0, groupId: "10005", iconId: "20013", order: 10 }, "100061": { baseCost: 0, groupId: "10006", iconId: "20013", order: 10 }, "100071": { baseCost: 0, groupId: "10007", iconId: "20013", order: 10 }, "100081": { baseCost: 0, groupId: "10008", iconId: "20013", order: 10 }, "100091": { baseCost: 0, groupId: "10009", iconId: "20013", order: 10 }, "100101": { baseCost: 0, groupId: "10010", iconId: "20043", order: 10 }, "100111": { baseCost: 0, groupId: "10011", iconId: "20013", order: 10 }, "100121": { baseCost: 0, groupId: "10012", iconId: "20013", order: 10 }, "100131": { baseCost: 0, groupId: "10013", iconId: "20013", order: 10 }, "100141": { baseCost: 0, groupId: "10014", iconId: "20013", order: 10 }, "100151": { baseCost: 0, groupId: "10015", iconId: "20013", order: 10 }, "100161": { baseCost: 0, groupId: "10016", iconId: "20013", order: 10 }, "100171": { baseCost: 0, groupId: "10017", iconId: "20013", order: 10 }, "100181": { baseCost: 0, groupId: "10018", iconId: "20013", order: 10 }, "100191": { baseCost: 0, groupId: "10019", iconId: "20013", order: 10 }, "100201": { baseCost: 0, groupId: "10020", iconId: "20043", order: 10 }, "100231": { baseCost: 0, groupId: "10023", iconId: "20013", order: 10 }, "100241": { baseCost: 0, groupId: "10024", iconId: "20013", order: 10 }, "100261": { baseCost: 0, groupId: "10026", iconId: "20013", order: 10 }, "100271": { baseCost: 0, groupId: "10027", iconId: "20043", order: 10 }, "100281": { baseCost: 0, groupId: "10028", iconId: "20013", order: 10 }, "100301": { baseCost: 0, groupId: "10030", iconId: "20013", order: 10 }, "100321": { baseCost: 0, groupId: "10032", iconId: "20023", order: 10 }, "100351": { baseCost: 0, groupId: "10035", iconId: "20013", order: 10 }, "100371": { baseCost: 0, groupId: "10037", iconId: "20013", order: 10 }, "100381": { baseCost: 0, groupId: "10038", iconId: "20013", order: 10 }, "100391": { baseCost: 0, groupId: "10039", iconId: "20013", order: 10 }, "100401": { baseCost: 0, groupId: "10040", iconId: "20043", order: 10 }, "100411": { baseCost: 0, groupId: "10041", iconId: "20013", order: 10 }, "100451": { baseCost: 0, groupId: "10045", iconId: "20023", order: 10 }, "100461": { baseCost: 0, groupId: "10046", iconId: "20013", order: 10 }, "100501": { baseCost: 0, groupId: "10050", iconId: "20013", order: 10 }, "100521": { baseCost: 0, groupId: "10052", iconId: "20023", order: 10 }, "100561": { baseCost: 0, groupId: "10056", iconId: "20013", order: 10 }, "100581": { baseCost: 0, groupId: "10058", iconId: "20013", order: 10 }, "100601": { baseCost: 0, groupId: "10060", iconId: "20013", order: 10 }, "100611": { baseCost: 0, groupId: "10061", iconId: "20013", order: 10 }, "10071": { baseCost: 0, groupId: "1007", iconId: "20013", order: 10 }, "10081": { baseCost: 0, groupId: "1008", iconId: "20013", order: 10 }, "10091": { baseCost: 0, groupId: "1009", iconId: "20013", order: 10 }, "10111": { baseCost: 0, groupId: "1011", iconId: "20013", order: 10 }, "10141": { baseCost: 0, groupId: "1014", iconId: "20013", order: 10 }, "10181": { baseCost: 0, groupId: "1018", iconId: "20013", order: 10 }, "10241": { baseCost: 0, groupId: "1024", iconId: "20013", order: 10 }, "10271": { baseCost: 0, groupId: "1027", iconId: "20043", order: 10 }, "10321": { baseCost: 0, groupId: "1032", iconId: "20023", order: 10 }, "10351": { baseCost: 0, groupId: "1035", iconId: "20013", order: 10 }, "10411": { baseCost: 0, groupId: "1041", iconId: "20013", order: 10 }, "10451": { baseCost: 0, groupId: "1045", iconId: "20023", order: 10 }, "10521": { baseCost: 0, groupId: "1052", iconId: "20023", order: 10 }, "10561": { baseCost: 0, groupId: "1056", iconId: "20013", order: 10 }, "10601": { baseCost: 0, groupId: "1060", iconId: "20013", order: 10 }, "10611": { baseCost: 0, groupId: "1061", iconId: "20013", order: 10 }, "110011": { baseCost: 0, groupId: "11001", iconId: "20023", order: 10 }, "110031": { baseCost: 0, groupId: "11003", iconId: "20013", order: 10 }, "110041": { baseCost: 0, groupId: "11004", iconId: "20013", order: 10 }, "110111": { baseCost: 0, groupId: "11011", iconId: "20023", order: 10 }, "110131": { baseCost: 0, groupId: "11013", iconId: "20013", order: 10 }, "110141": { baseCost: 0, groupId: "11014", iconId: "20043", order: 10 }, "110181": { baseCost: 0, groupId: "11018", iconId: "20013", order: 10 }, "110241": { baseCost: 0, groupId: "11024", iconId: "20013", order: 10 }, "110301": { baseCost: 0, groupId: "11030", iconId: "20023", order: 10 }, "110451": { baseCost: 0, groupId: "11045", iconId: "20013", order: 10 }, "110561": { baseCost: 0, groupId: "11056", iconId: "20013", order: 10 }, "200011": { baseCost: 110, groupId: "20001", iconId: "10011", order: 1005 }, "200012": { baseCost: 90, groupId: "20001", iconId: "10011", order: 1010 }, "200013": { baseCost: 50, groupId: "20001", iconId: "10014", order: 1020 }, "200021": { baseCost: 110, groupId: "20002", iconId: "10011", order: 1030 }, "200022": { baseCost: 90, groupId: "20002", iconId: "10011", order: 1040 }, "200023": { baseCost: 50, groupId: "20002", iconId: "10014", order: 1050 }, "200031": { baseCost: 110, groupId: "20003", iconId: "10021", order: 1060 }, "200032": { baseCost: 90, groupId: "20003", iconId: "10021", order: 1070 }, "200033": { baseCost: 50, groupId: "20003", iconId: "10024", order: 1080 }, "200041": { baseCost: 110, groupId: "20004", iconId: "10021", order: 1090 }, "200042": { baseCost: 90, groupId: "20004", iconId: "10021", order: 1100 }, "200043": { baseCost: 50, groupId: "20004", iconId: "10024", order: 1110 }, "200051": { baseCost: 110, groupId: "20005", iconId: "10021", order: 1120 }, "200052": { baseCost: 90, groupId: "20005", iconId: "10021", order: 1130 }, "200053": { baseCost: 50, groupId: "20005", iconId: "10024", order: 1140 }, "200061": { baseCost: 110, groupId: "20006", iconId: "10021", order: 1150 }, "200062": { baseCost: 90, groupId: "20006", iconId: "10021", order: 1160 }, "200063": { baseCost: 50, groupId: "20006", iconId: "10024", order: 1170 }, "200071": { baseCost: 110, groupId: "20007", iconId: "10021", order: 1180 }, "200072": { baseCost: 90, groupId: "20007", iconId: "10021", order: 1190 }, "200073": { baseCost: 50, groupId: "20007", iconId: "10024", order: 1200 }, "200081": { baseCost: 90, groupId: "20008", iconId: "10021", order: 1210 }, "200082": { baseCost: 70, groupId: "20008", iconId: "10021", order: 1220 }, "200083": { baseCost: 40, groupId: "20008", iconId: "10024", order: 1230 }, "200091": { baseCost: 90, groupId: "20009", iconId: "10021", order: 1240 }, "200092": { baseCost: 70, groupId: "20009", iconId: "10021", order: 1250 }, "200093": { baseCost: 40, groupId: "20009", iconId: "10024", order: 1260 }, "200101": { baseCost: 90, groupId: "20010", iconId: "10021", order: 1270 }, "200102": { baseCost: 70, groupId: "20010", iconId: "10021", order: 1280 }, "200103": { baseCost: 40, groupId: "20010", iconId: "10024", order: 1290 }, "200111": { baseCost: 90, groupId: "20011", iconId: "10021", order: 1300 }, "200112": { baseCost: 70, groupId: "20011", iconId: "10021", order: 1310 }, "200113": { baseCost: 40, groupId: "20011", iconId: "10024", order: 1320 }, "200121": { baseCost: 90, groupId: "20012", iconId: "10021", order: 1330 }, "200122": { baseCost: 70, groupId: "20012", iconId: "10021", order: 1340 }, "200123": { baseCost: 40, groupId: "20012", iconId: "10024", order: 1350 }, "200131": { baseCost: 110, groupId: "20013", iconId: "10021", order: 1390 }, "200132": { baseCost: 90, groupId: "20013", iconId: "10021", order: 1400 }, "200133": { baseCost: 50, groupId: "20013", iconId: "10024", order: 1410 }, "200141": { baseCost: 110, groupId: "20014", iconId: "10021", order: 1420 }, "200142": { baseCost: 90, groupId: "20014", iconId: "10021", order: 1430 }, "200143": { baseCost: 50, groupId: "20014", iconId: "10024", order: 1440 }, "200151": { baseCost: 110, groupId: "20015", iconId: "10031", order: 1450 }, "200152": { baseCost: 90, groupId: "20015", iconId: "10031", order: 1460 }, "200153": { baseCost: 50, groupId: "20015", iconId: "10034", order: 1470 }, "200161": { baseCost: 110, groupId: "20016", iconId: "10031", order: 1480 }, "200162": { baseCost: 90, groupId: "20016", iconId: "10031", order: 1490 }, "200163": { baseCost: 50, groupId: "20016", iconId: "10034", order: 1500 }, "200171": { baseCost: 110, groupId: "20017", iconId: "10011", order: 1510 }, "200172": { baseCost: 90, groupId: "20017", iconId: "10011", order: 1520 }, "200173": { baseCost: 50, groupId: "20017", iconId: "10014", order: 1530 }, "200181": { baseCost: 110, groupId: "20018", iconId: "10011", order: 1540 }, "200182": { baseCost: 90, groupId: "20018", iconId: "10011", order: 1550 }, "200183": { baseCost: 50, groupId: "20018", iconId: "10014", order: 1560 }, "200191": { baseCost: 110, groupId: "20019", iconId: "10011", order: 1570 }, "200192": { baseCost: 90, groupId: "20019", iconId: "10011", order: 1580 }, "200193": { baseCost: 50, groupId: "20019", iconId: "10014", order: 1590 }, "200201": { baseCost: 110, groupId: "20020", iconId: "10011", order: 1600 }, "200202": { baseCost: 90, groupId: "20020", iconId: "10011", order: 1610 }, "200203": { baseCost: 50, groupId: "20020", iconId: "10014", order: 1620 }, "200211": { baseCost: 110, groupId: "20021", iconId: "10041", order: 1630 }, "200212": { baseCost: 90, groupId: "20021", iconId: "10041", order: 1640 }, "200221": { baseCost: 110, groupId: "20022", iconId: "10041", order: 1650 }, "200222": { baseCost: 90, groupId: "20022", iconId: "10041", order: 1660 }, "200231": { baseCost: 110, groupId: "20023", iconId: "10041", order: 1670 }, "200232": { baseCost: 90, groupId: "20023", iconId: "10041", order: 1680 }, "200233": { baseCost: 50, groupId: "20023", iconId: "10044", order: 1690 }, "200241": { baseCost: 110, groupId: "20024", iconId: "10041", order: 1700 }, "200242": { baseCost: 90, groupId: "20024", iconId: "10041", order: 1710 }, "200251": { baseCost: 110, groupId: "20025", iconId: "10051", order: 1720 }, "200252": { baseCost: 90, groupId: "20025", iconId: "10051", order: 1730 }, "200253": { baseCost: 50, groupId: "20025", iconId: "10054", order: 1740 }, "200261": { baseCost: 110, groupId: "20026", iconId: "10011", order: 1750 }, "200262": { baseCost: 90, groupId: "20026", iconId: "10011", order: 1760 }, "200263": { baseCost: 50, groupId: "20026", iconId: "10014", order: 1770 }, "200271": { baseCost: 110, groupId: "20027", iconId: "10011", order: 1780 }, "200272": { baseCost: 90, groupId: "20027", iconId: "10011", order: 1790 }, "200281": { baseCost: 110, groupId: "20028", iconId: "10031", order: 1800 }, "200282": { baseCost: 90, groupId: "20028", iconId: "10031", order: 1810 }, "200283": { baseCost: 50, groupId: "20028", iconId: "10034", order: 1820 }, "200291": { baseCost: 110, groupId: "20029", iconId: "10041", order: 1830 }, "200292": { baseCost: 90, groupId: "20029", iconId: "10041", order: 1840 }, "200301": { baseCost: 110, groupId: "20030", iconId: "10011", order: 1850 }, "200302": { baseCost: 90, groupId: "20030", iconId: "10011", order: 1860 }, "200311": { baseCost: 50, groupId: "20031", iconId: "10014", order: 1870 }, "200321": { baseCost: 50, groupId: "20032", iconId: "10024", order: 1880 }, "200331": { baseCost: 180, groupId: "20033", iconId: "20012", order: 1890 }, "200332": { baseCost: 180, groupId: "20033", iconId: "20011", order: 1900 }, "200333": { baseCost: 100, groupId: "20033", iconId: "20014", order: 1910 }, "200341": { baseCost: 180, groupId: "20034", iconId: "20042", order: 1920 }, "200342": { baseCost: 180, groupId: "20034", iconId: "20041", order: 1930 }, "200343": { baseCost: 100, groupId: "20034", iconId: "20044", order: 1940 }, "200351": { baseCost: 170, groupId: "20035", iconId: "20022", order: 1950 }, "200352": { baseCost: 170, groupId: "20035", iconId: "20021", order: 1960 }, "200353": { baseCost: 100, groupId: "20035", iconId: "20024", order: 1970 }, "200361": { baseCost: 170, groupId: "20036", iconId: "20012", order: 1980 }, "200362": { baseCost: 170, groupId: "20036", iconId: "20011", order: 1990 }, "200371": { baseCost: 170, groupId: "20037", iconId: "20042", order: 2e3 }, "200372": { baseCost: 170, groupId: "20037", iconId: "20041", order: 2010 }, "200381": { baseCost: 170, groupId: "20038", iconId: "20022", order: 2020 }, "200382": { baseCost: 170, groupId: "20038", iconId: "20021", order: 2030 }, "200391": { baseCost: 100, groupId: "20039", iconId: "20024", order: 2040 }, "200401": { baseCost: 100, groupId: "20040", iconId: "20024", order: 2050 }, "200411": { baseCost: 100, groupId: "20041", iconId: "20014", order: 2060 }, "200421": { baseCost: 100, groupId: "20042", iconId: "20014", order: 2070 }, "200431": { baseCost: 140, groupId: "20043", iconId: "20062", order: 2080 }, "200432": { baseCost: 140, groupId: "20043", iconId: "20061", order: 2090 }, "200433": { baseCost: 70, groupId: "20043", iconId: "20064", order: 2100 }, "200441": { baseCost: 160, groupId: "20044", iconId: "20022", order: 2110 }, "200442": { baseCost: 160, groupId: "20044", iconId: "20021", order: 2120 }, "200451": { baseCost: 120, groupId: "20045", iconId: "20052", order: 2130 }, "200452": { baseCost: 120, groupId: "20045", iconId: "20051", order: 2140 }, "200461": { baseCost: 170, groupId: "20046", iconId: "20012", order: 2150 }, "200462": { baseCost: 170, groupId: "20046", iconId: "20011", order: 2160 }, "200471": { baseCost: 170, groupId: "20047", iconId: "20022", order: 2170 }, "200472": { baseCost: 170, groupId: "20047", iconId: "20021", order: 2180 }, "200481": { baseCost: 170, groupId: "20048", iconId: "20022", order: 2190 }, "200482": { baseCost: 170, groupId: "20048", iconId: "20021", order: 2200 }, "200491": { baseCost: 150, groupId: "20049", iconId: "20042", order: 2210 }, "200492": { baseCost: 150, groupId: "20049", iconId: "20041", order: 2220 }, "200501": { baseCost: 120, groupId: "20050", iconId: "20052", order: 2230 }, "200502": { baseCost: 120, groupId: "20050", iconId: "20051", order: 2240 }, "200511": { baseCost: 170, groupId: "20051", iconId: "20012", order: 2250 }, "200512": { baseCost: 170, groupId: "20051", iconId: "20011", order: 2260 }, "200521": { baseCost: 100, groupId: "20052", iconId: "20024", order: 2270 }, "200531": { baseCost: 120, groupId: "20053", iconId: "20042", order: 2280 }, "200532": { baseCost: 120, groupId: "20053", iconId: "20041", order: 2290 }, "200541": { baseCost: 180, groupId: "20054", iconId: "20012", order: 2300 }, "200542": { baseCost: 180, groupId: "20054", iconId: "20011", order: 2310 }, "200551": { baseCost: 180, groupId: "20055", iconId: "20042", order: 2320 }, "200552": { baseCost: 180, groupId: "20055", iconId: "20041", order: 2330 }, "200561": { baseCost: 180, groupId: "20056", iconId: "20022", order: 2340 }, "200562": { baseCost: 180, groupId: "20056", iconId: "20021", order: 2350 }, "200571": { baseCost: 180, groupId: "20057", iconId: "20022", order: 2360 }, "200572": { baseCost: 180, groupId: "20057", iconId: "20021", order: 2370 }, "200581": { baseCost: 180, groupId: "20058", iconId: "20012", order: 2380 }, "200582": { baseCost: 180, groupId: "20058", iconId: "20011", order: 2390 }, "200591": { baseCost: 180, groupId: "20059", iconId: "20012", order: 2400 }, "200592": { baseCost: 180, groupId: "20059", iconId: "20011", order: 2410 }, "200601": { baseCost: 180, groupId: "20060", iconId: "20042", order: 2420 }, "200602": { baseCost: 180, groupId: "20060", iconId: "20041", order: 2430 }, "200611": { baseCost: 180, groupId: "20061", iconId: "20012", order: 2440 }, "200612": { baseCost: 180, groupId: "20061", iconId: "20011", order: 2450 }, "200621": { baseCost: 180, groupId: "20062", iconId: "20022", order: 2460 }, "200622": { baseCost: 180, groupId: "20062", iconId: "20021", order: 2470 }, "200631": { baseCost: 180, groupId: "20063", iconId: "20012", order: 2480 }, "200632": { baseCost: 180, groupId: "20063", iconId: "20011", order: 2490 }, "200641": { baseCost: 180, groupId: "20064", iconId: "20042", order: 2500 }, "200642": { baseCost: 180, groupId: "20064", iconId: "20041", order: 2510 }, "200651": { baseCost: 160, groupId: "20065", iconId: "20042", order: 2520 }, "200652": { baseCost: 160, groupId: "20065", iconId: "20041", order: 2530 }, "200662": { baseCost: 160, groupId: "20066", iconId: "20021", order: 2550 }, "200671": { baseCost: 160, groupId: "20067", iconId: "20012", order: 2560 }, "200672": { baseCost: 160, groupId: "20067", iconId: "20011", order: 2570 }, "200681": { baseCost: 160, groupId: "20068", iconId: "20012", order: 2580 }, "200682": { baseCost: 160, groupId: "20068", iconId: "20011", order: 2590 }, "200691": { baseCost: 160, groupId: "20069", iconId: "20022", order: 2600 }, "200692": { baseCost: 160, groupId: "20069", iconId: "20021", order: 2610 }, "200701": { baseCost: 160, groupId: "20070", iconId: "20042", order: 2620 }, "200702": { baseCost: 160, groupId: "20070", iconId: "20041", order: 2630 }, "200711": { baseCost: 160, groupId: "20071", iconId: "20022", order: 2640 }, "200712": { baseCost: 160, groupId: "20071", iconId: "20021", order: 2650 }, "200721": { baseCost: 160, groupId: "20072", iconId: "20012", order: 2660 }, "200722": { baseCost: 160, groupId: "20072", iconId: "20011", order: 2670 }, "200731": { baseCost: 160, groupId: "20073", iconId: "20012", order: 2680 }, "200732": { baseCost: 160, groupId: "20073", iconId: "20011", order: 2690 }, "200741": { baseCost: 160, groupId: "20074", iconId: "20022", order: 2700 }, "200742": { baseCost: 160, groupId: "20074", iconId: "20021", order: 2710 }, "200751": { baseCost: 160, groupId: "20075", iconId: "20012", order: 2720 }, "200752": { baseCost: 160, groupId: "20075", iconId: "20011", order: 2730 }, "200761": { baseCost: 160, groupId: "20076", iconId: "20022", order: 2740 }, "200762": { baseCost: 160, groupId: "20076", iconId: "20021", order: 2750 }, "200771": { baseCost: 140, groupId: "20077", iconId: "30051", order: 2760 }, "200772": { baseCost: 140, groupId: "20077", iconId: "30052", order: 2755 }, "200781": { baseCost: 140, groupId: "20078", iconId: "30051", order: 2770 }, "200791": { baseCost: 130, groupId: "20079", iconId: "30041", order: 2780 }, "200801": { baseCost: 130, groupId: "20080", iconId: "30041", order: 2790 }, "200811": { baseCost: 130, groupId: "20081", iconId: "30041", order: 2800 }, "200821": { baseCost: 130, groupId: "20082", iconId: "30041", order: 2810 }, "200831": { baseCost: 130, groupId: "20083", iconId: "30051", order: 2820 }, "200841": { baseCost: 130, groupId: "20084", iconId: "30051", order: 2830 }, "200851": { baseCost: 130, groupId: "20085", iconId: "30011", order: 2840 }, "200861": { baseCost: 130, groupId: "20086", iconId: "30051", order: 2850 }, "200871": { baseCost: 130, groupId: "20087", iconId: "30051", order: 2860 }, "200881": { baseCost: 130, groupId: "20088", iconId: "30011", order: 2870 }, "200891": { baseCost: 130, groupId: "20089", iconId: "30051", order: 2880 }, "200901": { baseCost: 130, groupId: "20090", iconId: "30051", order: 2890 }, "200911": { baseCost: 130, groupId: "20091", iconId: "30011", order: 2900 }, "200921": { baseCost: 130, groupId: "20092", iconId: "30051", order: 2910 }, "200931": { baseCost: 130, groupId: "20093", iconId: "30051", order: 2920 }, "200941": { baseCost: 130, groupId: "20094", iconId: "30011", order: 2930 }, "200951": { baseCost: 110, groupId: "20095", iconId: "10021", order: 1360 }, "200952": { baseCost: 90, groupId: "20095", iconId: "10021", order: 1370 }, "200953": { baseCost: 50, groupId: "20095", iconId: "10024", order: 1380 }, "200961": { baseCost: 110, groupId: "20096", iconId: "20011", order: 20010 }, "200962": { baseCost: 100, groupId: "20096", iconId: "20011", order: 20020 }, "200971": { baseCost: 110, groupId: "20097", iconId: "20011", order: 20030 }, "200972": { baseCost: 100, groupId: "20097", iconId: "20011", order: 20040 }, "200981": { baseCost: 170, groupId: "20098", iconId: "20012", order: 20050 }, "200982": { baseCost: 170, groupId: "20098", iconId: "20011", order: 20060 }, "200991": { baseCost: 160, groupId: "20099", iconId: "20042", order: 20070 }, "200992": { baseCost: 160, groupId: "20099", iconId: "20041", order: 20080 }, "201001": { baseCost: 140, groupId: "20100", iconId: "20052", order: 20090 }, "201002": { baseCost: 140, groupId: "20100", iconId: "20051", order: 20100 }, "201011": { baseCost: 170, groupId: "20101", iconId: "30012", order: 20110 }, "201012": { baseCost: 170, groupId: "20101", iconId: "30011", order: 20120 }, "201021": { baseCost: 170, groupId: "20102", iconId: "30052", order: 20130 }, "201022": { baseCost: 170, groupId: "20102", iconId: "30051", order: 20140 }, "201031": { baseCost: 110, groupId: "20103", iconId: "20011", order: 20150 }, "201032": { baseCost: 100, groupId: "20103", iconId: "20011", order: 20160 }, "201041": { baseCost: 110, groupId: "20104", iconId: "20011", order: 20170 }, "201042": { baseCost: 100, groupId: "20104", iconId: "20011", order: 20180 }, "201051": { baseCost: 160, groupId: "20105", iconId: "20012", order: 20190 }, "201052": { baseCost: 160, groupId: "20105", iconId: "20011", order: 20200 }, "201061": { baseCost: 160, groupId: "20106", iconId: "20042", order: 20210 }, "201062": { baseCost: 160, groupId: "20106", iconId: "20041", order: 20220 }, "201071": { baseCost: 120, groupId: "20107", iconId: "20012", order: 20230 }, "201072": { baseCost: 120, groupId: "20107", iconId: "20011", order: 20240 }, "201081": { baseCost: 160, groupId: "20108", iconId: "30012", order: 20250 }, "201082": { baseCost: 160, groupId: "20108", iconId: "30011", order: 20260 }, "201091": { baseCost: 160, groupId: "20109", iconId: "30022", order: 20270 }, "201092": { baseCost: 160, groupId: "20109", iconId: "30021", order: 20280 }, "201101": { baseCost: 110, groupId: "20110", iconId: "20011", order: 20300 }, "201102": { baseCost: 100, groupId: "20110", iconId: "20011", order: 20310 }, "201111": { baseCost: 110, groupId: "20111", iconId: "20011", order: 20320 }, "201112": { baseCost: 100, groupId: "20111", iconId: "20011", order: 20330 }, "201121": { baseCost: 110, groupId: "20112", iconId: "20092", order: 20340 }, "201122": { baseCost: 110, groupId: "20112", iconId: "20091", order: 20350 }, "201131": { baseCost: 140, groupId: "20113", iconId: "20052", order: 20360 }, "201132": { baseCost: 140, groupId: "20113", iconId: "20051", order: 20370 }, "201141": { baseCost: 160, groupId: "20114", iconId: "20022", order: 20380 }, "201142": { baseCost: 160, groupId: "20114", iconId: "20021", order: 20390 }, "201151": { baseCost: 160, groupId: "20115", iconId: "30012", order: 20400 }, "201152": { baseCost: 160, groupId: "20115", iconId: "30011", order: 20410 }, "201161": { baseCost: 160, groupId: "20116", iconId: "30052", order: 20420 }, "201162": { baseCost: 160, groupId: "20116", iconId: "30051", order: 20430 }, "201171": { baseCost: 110, groupId: "20117", iconId: "20011", order: 20440 }, "201172": { baseCost: 100, groupId: "20117", iconId: "20011", order: 20450 }, "201181": { baseCost: 110, groupId: "20118", iconId: "20011", order: 20460 }, "201182": { baseCost: 100, groupId: "20118", iconId: "20011", order: 20470 }, "201191": { baseCost: 160, groupId: "20119", iconId: "20012", order: 20480 }, "201192": { baseCost: 160, groupId: "20119", iconId: "20011", order: 20490 }, "201202": { baseCost: 160, groupId: "20120", iconId: "20021", order: 20510 }, "201211": { baseCost: 160, groupId: "20121", iconId: "20012", order: 20520 }, "201212": { baseCost: 160, groupId: "20121", iconId: "20011", order: 20530 }, "201221": { baseCost: 160, groupId: "20122", iconId: "30052", order: 20540 }, "201222": { baseCost: 160, groupId: "20122", iconId: "30051", order: 20550 }, "201231": { baseCost: 110, groupId: "20123", iconId: "30072", order: 20560 }, "201232": { baseCost: 110, groupId: "20123", iconId: "30071", order: 20570 }, "201241": { baseCost: 140, groupId: "20124", iconId: "20011", order: 20580 }, "201242": { baseCost: 130, groupId: "20124", iconId: "20011", order: 20590 }, "201251": { baseCost: 140, groupId: "20125", iconId: "20011", order: 20600 }, "201252": { baseCost: 130, groupId: "20125", iconId: "20011", order: 20610 }, "201261": { baseCost: 110, groupId: "20126", iconId: "20052", order: 20620 }, "201262": { baseCost: 110, groupId: "20126", iconId: "20051", order: 20630 }, "201272": { baseCost: 180, groupId: "20127", iconId: "20011", order: 20650 }, "201281": { baseCost: 180, groupId: "20128", iconId: "20022", order: 20660 }, "201282": { baseCost: 180, groupId: "20128", iconId: "20021", order: 20670 }, "201291": { baseCost: 180, groupId: "20129", iconId: "20042", order: 20680 }, "201292": { baseCost: 180, groupId: "20129", iconId: "20041", order: 20690 }, "201302": { baseCost: 130, groupId: "20130", iconId: "30021", order: 20710 }, "201311": { baseCost: 140, groupId: "20131", iconId: "20011", order: 20720 }, "201312": { baseCost: 130, groupId: "20131", iconId: "20011", order: 20730 }, "201321": { baseCost: 140, groupId: "20132", iconId: "20011", order: 20740 }, "201322": { baseCost: 130, groupId: "20132", iconId: "20011", order: 20750 }, "201331": { baseCost: 120, groupId: "20133", iconId: "20042", order: 20760 }, "201332": { baseCost: 120, groupId: "20133", iconId: "20041", order: 20770 }, "201341": { baseCost: 120, groupId: "20134", iconId: "20042", order: 20780 }, "201342": { baseCost: 120, groupId: "20134", iconId: "20041", order: 20790 }, "201351": { baseCost: 180, groupId: "20135", iconId: "20022", order: 20800 }, "201352": { baseCost: 180, groupId: "20135", iconId: "20021", order: 20810 }, "201361": { baseCost: 120, groupId: "20136", iconId: "20042", order: 20820 }, "201362": { baseCost: 120, groupId: "20136", iconId: "20041", order: 20830 }, "201371": { baseCost: 110, groupId: "20137", iconId: "30072", order: 20840 }, "201372": { baseCost: 110, groupId: "20137", iconId: "30071", order: 20850 }, "201381": { baseCost: 140, groupId: "20138", iconId: "20011", order: 20860 }, "201382": { baseCost: 130, groupId: "20138", iconId: "20011", order: 20870 }, "201391": { baseCost: 140, groupId: "20139", iconId: "20011", order: 20880 }, "201392": { baseCost: 130, groupId: "20139", iconId: "20011", order: 20890 }, "201401": { baseCost: 120, groupId: "20140", iconId: "20042", order: 20900 }, "201402": { baseCost: 120, groupId: "20140", iconId: "20041", order: 20910 }, "201411": { baseCost: 120, groupId: "20141", iconId: "20012", order: 20920 }, "201412": { baseCost: 120, groupId: "20141", iconId: "20011", order: 20930 }, "201421": { baseCost: 180, groupId: "20142", iconId: "20022", order: 20940 }, "201422": { baseCost: 180, groupId: "20142", iconId: "20021", order: 20950 }, "201431": { baseCost: 120, groupId: "20143", iconId: "20092", order: 20960 }, "201432": { baseCost: 120, groupId: "20143", iconId: "20091", order: 20970 }, "201441": { baseCost: 180, groupId: "20144", iconId: "30052", order: 20980 }, "201442": { baseCost: 180, groupId: "20144", iconId: "30051", order: 20990 }, "201451": { baseCost: 140, groupId: "20145", iconId: "20011", order: 21e3 }, "201452": { baseCost: 130, groupId: "20145", iconId: "20011", order: 21010 }, "201461": { baseCost: 140, groupId: "20146", iconId: "20011", order: 21020 }, "201462": { baseCost: 130, groupId: "20146", iconId: "20011", order: 21030 }, "201471": { baseCost: 110, groupId: "20147", iconId: "20092", order: 21040 }, "201472": { baseCost: 110, groupId: "20147", iconId: "20091", order: 21050 }, "201481": { baseCost: 170, groupId: "20148", iconId: "20022", order: 21060 }, "201482": { baseCost: 170, groupId: "20148", iconId: "20021", order: 21070 }, "201491": { baseCost: 180, groupId: "20149", iconId: "20022", order: 21080 }, "201492": { baseCost: 180, groupId: "20149", iconId: "20021", order: 21090 }, "201501": { baseCost: 110, groupId: "20150", iconId: "20092", order: 21100 }, "201502": { baseCost: 110, groupId: "20150", iconId: "20091", order: 21110 }, "201511": { baseCost: 180, groupId: "20151", iconId: "30012", order: 21120 }, "201512": { baseCost: 180, groupId: "20151", iconId: "30011", order: 21130 }, "201521": { baseCost: 130, groupId: "20152", iconId: "10051", order: 21140 }, "201522": { baseCost: 110, groupId: "20152", iconId: "10051", order: 21150 }, "201531": { baseCost: 130, groupId: "20153", iconId: "10051", order: 21160 }, "201532": { baseCost: 110, groupId: "20153", iconId: "10051", order: 21170 }, "201541": { baseCost: 130, groupId: "20154", iconId: "10051", order: 21180 }, "201542": { baseCost: 110, groupId: "20154", iconId: "10051", order: 21190 }, "201551": { baseCost: 130, groupId: "20155", iconId: "10051", order: 21200 }, "201552": { baseCost: 110, groupId: "20155", iconId: "10051", order: 21210 }, "201561": { baseCost: 110, groupId: "20156", iconId: "10062", order: 21220 }, "201562": { baseCost: 110, groupId: "20156", iconId: "10061", order: 21230 }, "201571": { baseCost: 160, groupId: "20157", iconId: "20021", order: 21240 }, "201581": { baseCost: 160, groupId: "20158", iconId: "20041", order: 21250 }, "201591": { baseCost: 160, groupId: "20159", iconId: "20011", order: 21270 }, "201592": { baseCost: 160, groupId: "20159", iconId: "20012", order: 21260 }, "201601": { baseCost: 100, groupId: "20160", iconId: "20041", order: 21280 }, "201611": { baseCost: 100, groupId: "20161", iconId: "20011", order: 21300 }, "201621": { baseCost: 100, groupId: "20162", iconId: "20021", order: 21310 }, "201631": { baseCost: 70, groupId: "20163", iconId: "10011", order: 21320 }, "201641": { baseCost: 70, groupId: "20164", iconId: "10011", order: 21330 }, "201651": { baseCost: 160, groupId: "20165", iconId: "20011", order: 21340 }, "201661": { baseCost: 160, groupId: "20166", iconId: "20011", order: 21350 }, "201671": { baseCost: 180, groupId: "20167", iconId: "20012", order: 21360 }, "201672": { baseCost: 180, groupId: "20167", iconId: "20011", order: 21370 }, "201681": { baseCost: 140, groupId: "20168", iconId: "20052", order: 21380 }, "201682": { baseCost: 140, groupId: "20168", iconId: "20051", order: 21390 }, "201691": { baseCost: 180, groupId: "20169", iconId: "20022", order: 21400 }, "201692": { baseCost: 180, groupId: "20169", iconId: "20021", order: 21410 }, "201701": { baseCost: 160, groupId: "20170", iconId: "20012", order: 21420 }, "201702": { baseCost: 160, groupId: "20170", iconId: "20011", order: 21430 }, "201902": { baseCost: 180, groupId: "20190", iconId: "20041", order: 21450 }, "202022": { baseCost: 180, groupId: "20202", iconId: "20011", order: 21510 }, "202032": { baseCost: 120, groupId: "20203", iconId: "20011", order: 21530 }, "202051": { baseCost: 200, groupId: "20205", iconId: "40012", order: 990 }, "210011": { baseCost: 200, groupId: "21001", iconId: "20102", order: 31e3 }, "210012": { baseCost: 200, groupId: "21001", iconId: "20101", order: 31001 }, "210021": { baseCost: 200, groupId: "21002", iconId: "20112", order: 31002 }, "210022": { baseCost: 200, groupId: "21002", iconId: "20111", order: 31003 }, "210031": { baseCost: 200, groupId: "21003", iconId: "20122", order: 31004 }, "210032": { baseCost: 200, groupId: "21003", iconId: "20121", order: 31005 }, "210041": { baseCost: 200, groupId: "21004", iconId: "20102", order: 31006 }, "210042": { baseCost: 200, groupId: "21004", iconId: "20101", order: 31007 }, "210051": { baseCost: 200, groupId: "21005", iconId: "20132", order: 31008 }, "210052": { baseCost: 200, groupId: "21005", iconId: "20131", order: 31009 }, "900011": { baseCost: 200, groupId: "90001", iconId: "20011", order: 30 }, "900021": { baseCost: 200, groupId: "90002", iconId: "20011", order: 30 }, "900031": { baseCost: 200, groupId: "90003", iconId: "20011", order: 30 }, "900041": { baseCost: 200, groupId: "90004", iconId: "20041", order: 30 }, "900051": { baseCost: 200, groupId: "90005", iconId: "20011", order: 30 }, "900061": { baseCost: 200, groupId: "90006", iconId: "20011", order: 30 }, "900071": { baseCost: 200, groupId: "90007", iconId: "20011", order: 30 }, "900081": { baseCost: 200, groupId: "90008", iconId: "20011", order: 30 }, "900091": { baseCost: 200, groupId: "90009", iconId: "20011", order: 30 }, "900101": { baseCost: 200, groupId: "90010", iconId: "20041", order: 30 }, "900111": { baseCost: 200, groupId: "90011", iconId: "20011", order: 30 }, "900121": { baseCost: 200, groupId: "90012", iconId: "20011", order: 30 }, "900131": { baseCost: 200, groupId: "90013", iconId: "20011", order: 30 }, "900141": { baseCost: 200, groupId: "90014", iconId: "20011", order: 30 }, "900151": { baseCost: 200, groupId: "90015", iconId: "20011", order: 30 }, "900161": { baseCost: 200, groupId: "90016", iconId: "20011", order: 30 }, "900171": { baseCost: 200, groupId: "90017", iconId: "20011", order: 30 }, "900181": { baseCost: 200, groupId: "90018", iconId: "20011", order: 30 }, "900191": { baseCost: 200, groupId: "90019", iconId: "20011", order: 30 }, "900201": { baseCost: 200, groupId: "90020", iconId: "20041", order: 30 }, "900231": { baseCost: 200, groupId: "90023", iconId: "20011", order: 30 }, "900241": { baseCost: 200, groupId: "90024", iconId: "20011", order: 30 }, "900261": { baseCost: 200, groupId: "90026", iconId: "20011", order: 30 }, "900271": { baseCost: 200, groupId: "90027", iconId: "20041", order: 30 }, "900281": { baseCost: 200, groupId: "90028", iconId: "20011", order: 30 }, "900301": { baseCost: 200, groupId: "90030", iconId: "20011", order: 30 }, "900321": { baseCost: 200, groupId: "90032", iconId: "20021", order: 30 }, "900351": { baseCost: 200, groupId: "90035", iconId: "20011", order: 30 }, "900371": { baseCost: 200, groupId: "90037", iconId: "20011", order: 30 }, "900381": { baseCost: 200, groupId: "90038", iconId: "20011", order: 30 }, "900391": { baseCost: 200, groupId: "90039", iconId: "20011", order: 30 }, "900401": { baseCost: 200, groupId: "90040", iconId: "20041", order: 30 }, "900411": { baseCost: 200, groupId: "90041", iconId: "20011", order: 30 }, "900451": { baseCost: 200, groupId: "90045", iconId: "20021", order: 30 }, "900461": { baseCost: 200, groupId: "90046", iconId: "20011", order: 30 }, "900501": { baseCost: 200, groupId: "90050", iconId: "20011", order: 30 }, "900521": { baseCost: 200, groupId: "90052", iconId: "20021", order: 30 }, "900561": { baseCost: 200, groupId: "90056", iconId: "20011", order: 30 }, "900581": { baseCost: 200, groupId: "90058", iconId: "20011", order: 30 }, "900601": { baseCost: 200, groupId: "90060", iconId: "20011", order: 30 }, "900611": { baseCost: 200, groupId: "90061", iconId: "20011", order: 30 }, "910011": { baseCost: 200, groupId: "91001", iconId: "20021", order: 30 }, "910031": { baseCost: 200, groupId: "91003", iconId: "20011", order: 30 }, "910041": { baseCost: 200, groupId: "91004", iconId: "20011", order: 30 }, "910111": { baseCost: 200, groupId: "91011", iconId: "20021", order: 30 }, "910131": { baseCost: 200, groupId: "91013", iconId: "20011", order: 30 }, "910141": { baseCost: 200, groupId: "91014", iconId: "20041", order: 30 }, "910181": { baseCost: 200, groupId: "91018", iconId: "20011", order: 30 }, "910241": { baseCost: 200, groupId: "91024", iconId: "20011", order: 30 }, "910301": { baseCost: 200, groupId: "91030", iconId: "20021", order: 30 }, "910451": { baseCost: 200, groupId: "91045", iconId: "20011", order: 30 }, "910561": { baseCost: 200, groupId: "91056", iconId: "20011", order: 30 } };

// ../uma-tools/components/HorseDefTypes.ts
function SkillSet(ids) {
  return (0, import_immutable.Map)(ids.map((id) => [skill_meta_default[id].groupId, id]));
}
var HorseState = class extends (0, import_immutable.Record)({
  outfitId: "",
  speed: false ? 1200 : 1850,
  stamina: false ? 1200 : 1700,
  power: false ? 800 : 1700,
  guts: false ? 400 : 1200,
  wisdom: false ? 400 : 1300,
  strategy: "Senkou",
  distanceAptitude: "S",
  surfaceAptitude: "A",
  strategyAptitude: "A",
  skills: SkillSet([])
}) {
};

// cli.ts
function loadJson(filePath) {
  const resolvedPath = (0, import_path.resolve)(process.cwd(), filePath);
  return JSON.parse((0, import_fs.readFileSync)(resolvedPath, "utf-8"));
}
function findAllSkillIdsByName(skillName, skillNames) {
  const matches = [];
  for (const [id, names] of Object.entries(skillNames)) {
    if (names[0] === skillName) {
      matches.push(id);
    }
  }
  return matches;
}
function findSkillVariantsByName(baseSkillName, skillNames, skillMeta) {
  const variants = [];
  const trimmedBaseName = baseSkillName.trim();
  const exactMatchId = findSkillIdByNameWithPreference(trimmedBaseName, skillNames, skillMeta, true);
  if (exactMatchId) {
    const baseCost = skillMeta[exactMatchId]?.baseCost ?? 200;
    if (baseCost === 0) {
    } else {
      variants.push({ skillId: exactMatchId, skillName: trimmedBaseName });
      return variants;
    }
  }
  for (const [id, names] of Object.entries(skillNames)) {
    const name = names[0];
    if (name === trimmedBaseName + " \u25CB" || name === trimmedBaseName + " \u25CE") {
      const baseCost = skillMeta[id]?.baseCost ?? 200;
      if (baseCost > 0) {
        variants.push({ skillId: id, skillName: name });
      }
    }
  }
  return variants;
}
function findSkillIdByNameWithPreference(skillName, skillNames, skillMeta, preferCostGreaterThanZero) {
  const matches = findAllSkillIdsByName(skillName, skillNames);
  if (matches.length === 0) {
    return null;
  }
  if (matches.length === 1) {
    return matches[0];
  }
  const preferred = matches.filter((id) => {
    const baseCost = skillMeta[id]?.baseCost ?? 200;
    return preferCostGreaterThanZero ? baseCost > 0 : baseCost === 0;
  });
  if (preferred.length > 0) {
    return preferred[0];
  }
  return matches[0];
}
function parseGroundCondition(name) {
  const normalized = name.toLowerCase();
  switch (normalized) {
    case "firm":
      return 1 /* Good */;
    case "good":
      return 2 /* Yielding */;
    case "soft":
      return 3 /* Soft */;
    case "heavy":
      return 4 /* Heavy */;
    default:
      throw new Error(`Invalid ground condition: ${name}`);
  }
}
function parseWeather(name) {
  const normalized = name.toLowerCase();
  switch (normalized) {
    case "sunny":
      return 1;
    case "cloudy":
      return 2;
    case "rainy":
      return 3;
    case "snowy":
      return 4;
    default:
      throw new Error(`Invalid weather: ${name}`);
  }
}
function parseSeason(name) {
  const normalized = name.toLowerCase();
  switch (normalized) {
    case "spring":
      return 1 /* Spring */;
    case "summer":
      return 2 /* Summer */;
    case "fall":
    case "autumn":
      return 3 /* Autumn */;
    case "winter":
      return 4 /* Winter */;
    case "sakura":
      return 5 /* Sakura */;
    default:
      throw new Error(`Invalid season: ${name}`);
  }
}
function parseStrategyName(name) {
  const normalized = name.toLowerCase();
  const strategyMap = {
    runaway: "Oonige",
    "front runner": "Nige",
    "pace chaser": "Senkou",
    "late surger": "Sasi",
    "end closer": "Oikomi"
  };
  for (const [key, value] of Object.entries(strategyMap)) {
    if (normalized === key || normalized === value.toLowerCase()) {
      return value;
    }
  }
  throw new Error(`Invalid strategy: ${name}`);
}
function formatStrategyName(japaneseName) {
  const strategyMap = {
    Oonige: "Runaway",
    Nige: "Front Runner",
    Senkou: "Pace Chaser",
    Sasi: "Late Surger",
    Oikomi: "End Closer"
  };
  return strategyMap[japaneseName] ?? japaneseName;
}
function formatDistanceType(distanceType) {
  switch (distanceType) {
    case 1:
      return "Sprint";
    case 2:
      return "Mile";
    case 3:
      return "Medium";
    case 4:
      return "Long";
    default:
      throw new Error(`Invalid distance type: ${distanceType}`);
  }
}
function formatSurface(surface) {
  return surface === 1 ? "Turf" : "Dirt";
}
function formatTurn(turn) {
  return turn === 1 ? "Clockwise" : "Counter-clockwise";
}
function processCourseData(rawCourse) {
  const courseWidth = 11.25;
  const horseLane = courseWidth / 18;
  const laneChangeAcceleration = 0.02 * 1.5;
  const laneChangeAccelerationPerFrame = laneChangeAcceleration / 15;
  const maxLaneDistance = courseWidth * rawCourse.laneMax / 1e4;
  const moveLanePoint = rawCourse.corners.length > 0 ? rawCourse.corners[0].start : 30;
  return {
    ...rawCourse,
    courseWidth,
    horseLane,
    laneChangeAcceleration,
    laneChangeAccelerationPerFrame,
    maxLaneDistance,
    moveLanePoint
  };
}
function parseSurface(surface) {
  if (!surface)
    return null;
  const normalized = surface.toLowerCase().trim();
  if (normalized === "turf")
    return 1;
  if (normalized === "dirt")
    return 0;
  return null;
}
function findMatchingCourses(courseData, trackNames, trackName, distance, surface) {
  const matches = [];
  const normalizedTrackName = trackName.toLowerCase();
  const surfaceValue = parseSurface(surface);
  for (const [courseId, rawCourse] of Object.entries(courseData)) {
    const courseTrackName = trackNames[rawCourse.raceTrackId.toString()]?.[1]?.toLowerCase();
    if (courseTrackName === normalizedTrackName && rawCourse.distance === distance) {
      if (surfaceValue !== null) {
        if (rawCourse.surface !== surfaceValue) {
          continue;
        }
      }
      const processedCourse = processCourseData(rawCourse);
      matches.push({ courseId, course: processedCourse });
    }
  }
  return matches;
}
function formatTrackDetails(course, trackNames, groundCondition, weather, season, courseId, numUmas) {
  const trackName = trackNames[course.raceTrackId.toString()]?.[1] ?? "Unknown";
  const distanceType = formatDistanceType(course.distanceType);
  const surface = formatSurface(course.surface);
  const turn = formatTurn(course.turn);
  const ground = groundCondition.charAt(0).toUpperCase() + groundCondition.slice(1).toLowerCase();
  const weatherFormatted = weather.charAt(0).toUpperCase() + weather.slice(1).toLowerCase();
  const seasonFormatted = season.charAt(0).toUpperCase() + season.slice(1).toLowerCase();
  const numUmasPart = numUmas ? `, ${numUmas} Umas` : "";
  const courseIdPart = courseId ? `, ID: ${courseId}` : "";
  return `${trackName}, ${course.distance}m (${distanceType}), ${surface}, ${turn}, ${seasonFormatted}, ${ground}, ${weatherFormatted}${numUmasPart}${courseIdPart}`;
}
function calculateSkillCost(skillId, skillMeta, skillConfig, baseUma, skillNames, allConfigSkills, skillNameToId, skillNameToConfigKey) {
  const currentSkill = skillMeta[skillId];
  const baseCost = currentSkill?.baseCost ?? 200;
  const discount = skillConfig.discount ?? 0;
  let totalCost = Math.ceil(baseCost * (1 - discount / 100));
  const skillsToIgnore = [
    "99 Problems",
    "G1 Averseness",
    "Gatekept",
    "Inner Post Averseness",
    "Outer Post Averseness",
    "Paddock Fright",
    "Wallflower",
    "You're Not the Boss of Me!",
    "\u2661 3D Nail Art"
  ];
  if (currentSkill?.groupId && baseUma && skillNames) {
    const currentGroupId = currentSkill.groupId;
    const currentOrder = currentSkill.order ?? 0;
    const umaSkillIds = [];
    baseUma.skills.forEach((skillId2) => {
      umaSkillIds.push(skillId2);
    });
    for (const [otherSkillId, otherSkillMeta] of Object.entries(skillMeta)) {
      if (otherSkillMeta.groupId === currentGroupId && (otherSkillMeta.order ?? 0) > currentOrder && !umaSkillIds.includes(otherSkillId)) {
        const otherSkillNames = skillNames[otherSkillId];
        if (otherSkillNames) {
          const primaryName = otherSkillNames[0];
          if (primaryName.endsWith(" \xD7") || skillsToIgnore.includes(primaryName)) {
            continue;
          }
        }
        let otherDiscount = 0;
        if (allConfigSkills && skillNameToId && skillNameToConfigKey) {
          for (const [skillName, id] of Object.entries(skillNameToId)) {
            if (id === otherSkillId) {
              const configKey = skillNameToConfigKey[skillName] || skillName;
              otherDiscount = allConfigSkills[configKey]?.discount ?? 0;
              break;
            }
          }
        }
        const otherBaseCost = otherSkillMeta.baseCost ?? 200;
        totalCost += Math.round(otherBaseCost * (1 - otherDiscount / 100));
      }
    }
  }
  return totalCost;
}
function formatTable(results, confidenceInterval) {
  const maxSkillLen = Math.max(...results.map((r) => r.skill.length), "Skill".length);
  const maxCostLen = Math.max(...results.map((r) => r.cost.toString().length), "Cost".length);
  const maxDiscountLen = Math.max(
    ...results.map((r) => (r.discount > 0 ? `${r.discount}%` : "-").length),
    "Discount".length
  );
  const maxSimulationsLen = Math.max(...results.map((r) => r.numSimulations.toString().length), "Sims".length);
  const maxMeanLen = Math.max(...results.map((r) => r.meanLength.toFixed(2).length), "Mean".length);
  const maxMedianLen = Math.max(...results.map((r) => r.medianLength.toFixed(2).length), "Median".length);
  const maxRatioLen = Math.max(
    ...results.map((r) => (r.meanLengthPerCost * 1e3).toFixed(2).length),
    "Mean/Cost".length
  );
  const maxMinMaxLen = Math.max(
    ...results.map((r) => `${r.minLength.toFixed(2)}-${r.maxLength.toFixed(2)}`.length),
    "Min-Max".length
  );
  const ciLabel = `${confidenceInterval}% CI`;
  const maxCILen = Math.max(
    ...results.map((r) => `${r.ciLower.toFixed(2)}-${r.ciUpper.toFixed(2)}`.length),
    ciLabel.length
  );
  const header = `Skill${" ".repeat(maxSkillLen - "Skill".length + 2)}Cost${" ".repeat(
    maxCostLen - "Cost".length + 2
  )}Discount${" ".repeat(maxDiscountLen - "Discount".length + 2)}Sims${" ".repeat(
    maxSimulationsLen - "Sims".length + 2
  )}Mean${" ".repeat(maxMeanLen - "Mean".length + 2)}Median${" ".repeat(
    maxMedianLen - "Median".length + 2
  )}Mean/Cost${" ".repeat(maxRatioLen - "Mean/Cost".length + 2)}Min-Max${" ".repeat(
    maxMinMaxLen - "Min-Max".length + 2
  )}${ciLabel}`;
  const separator = "-".repeat(header.length);
  const rows = results.map((r) => {
    const skillPad = " ".repeat(maxSkillLen - r.skill.length + 2);
    const costPad = " ".repeat(maxCostLen - r.cost.toString().length + 2);
    const discountStr = r.discount > 0 ? `${r.discount}%` : "-";
    const discountPad = " ".repeat(maxDiscountLen - discountStr.length + 2);
    const simulationsPad = " ".repeat(maxSimulationsLen - r.numSimulations.toString().length + 2);
    const meanPad = " ".repeat(maxMeanLen - r.meanLength.toFixed(2).length + 2);
    const medianPad = " ".repeat(maxMedianLen - r.medianLength.toFixed(2).length + 2);
    const ratioPad = " ".repeat(maxRatioLen - (r.meanLengthPerCost * 1e3).toFixed(2).length + 2);
    const minMaxStr = `${r.minLength.toFixed(2)}-${r.maxLength.toFixed(2)}`;
    const minMaxPad = " ".repeat(maxMinMaxLen - minMaxStr.length + 2);
    const ciStr = `${r.ciLower.toFixed(2)}-${r.ciUpper.toFixed(2)}`;
    const ciPad = " ".repeat(maxCILen - ciStr.length);
    return `${r.skill}${skillPad}${r.cost}${costPad}${discountStr}${discountPad}${r.numSimulations}${simulationsPad}${r.meanLength.toFixed(2)}${meanPad}${r.medianLength.toFixed(2)}${medianPad}${(r.meanLengthPerCost * 1e3).toFixed(2)}${ratioPad}${minMaxStr}${minMaxPad}${ciStr}${ciPad}`;
  });
  return [header, separator, ...rows].join("\n");
}
async function main() {
  const program2 = new Command();
  program2.name("umalator-global-cli").description("CLI tool for evaluating skills in umalator-global").argument("[config]", "Path to config file", "default.json").parse(process.argv);
  const args = program2.args;
  const configPath = "configs/" + (args[0] || "default.json");
  const config = loadJson(configPath);
  const skillMeta = loadJson("../uma-tools/umalator-global/skill_meta.json");
  const courseData = loadJson("../uma-tools/umalator-global/course_data.json");
  const skillNames = loadJson("../uma-tools/umalator-global/skillnames.json");
  const trackNames = loadJson("../uma-tools/umalator-global/tracknames.json");
  if (!config.track) {
    console.error("Error: config must specify track");
    process.exit(1);
  }
  if (!config.uma) {
    console.error("Error: config must specify uma");
    process.exit(1);
  }
  let course;
  let selectedCourseId;
  if (config.track.courseId) {
    selectedCourseId = config.track.courseId;
    const rawCourse = courseData[selectedCourseId];
    if (!rawCourse) {
      console.error(`Error: Course ${selectedCourseId} not found`);
      process.exit(1);
    }
    course = processCourseData(rawCourse);
    if (course.turn === void 0 || course.turn === null) {
      console.error(`Error: Course ${selectedCourseId} is missing turn field`);
      process.exit(1);
    }
  } else if (config.track.trackName && config.track.distance) {
    const surfaceFilter = config.track.surface ? ` and surface ${config.track.surface}` : "";
    if (config.track.surface) {
      console.log(`Filtering courses by surface: ${config.track.surface}`);
    }
    const matches = findMatchingCourses(
      courseData,
      trackNames,
      config.track.trackName,
      config.track.distance,
      config.track.surface
    );
    if (matches.length === 0) {
      console.error(
        `Error: No courses found matching track "${config.track.trackName}" with distance ${config.track.distance}m${surfaceFilter}`
      );
      process.exit(1);
    }
    if (matches.length > 1) {
      console.log(`Found ${matches.length} matching course(s):`);
      for (const { courseId, course: matchCourse } of matches) {
        const trackName = trackNames[matchCourse.raceTrackId.toString()]?.[1] ?? "Unknown";
        const distanceType = formatDistanceType(matchCourse.distanceType);
        const surface = formatSurface(matchCourse.surface);
        const turn = formatTurn(matchCourse.turn);
        console.log(
          `  courseId: ${courseId} - ${trackName}, ${matchCourse.distance}m (${distanceType}), ${surface}, ${turn}`
        );
      }
      console.log("");
    }
    const selected = matches[0];
    course = selected.course;
    selectedCourseId = selected.courseId;
    if (course.turn === void 0 || course.turn === null) {
      console.error(`Error: Course ${selectedCourseId} is missing turn field`);
      process.exit(1);
    }
  } else {
    console.error("Error: config must specify either track.courseId or both track.trackName and track.distance");
    process.exit(1);
  }
  const umaConfig = config.uma;
  const useRandomMood = umaConfig.mood === void 0;
  const moodValue = umaConfig.mood !== void 0 ? umaConfig.mood : null;
  const numUmas = config.track.numUmas ?? 18;
  const racedef = {
    mood: moodValue ?? 2,
    groundCondition: config.track.groundCondition ? parseGroundCondition(config.track.groundCondition) : 1 /* Good */,
    weather: config.track.weather ? parseWeather(config.track.weather) : 1,
    season: config.track.season ? parseSeason(config.track.season) : 1 /* Spring */,
    time: 0 /* NoTime */,
    grade: 100 /* G1 */,
    popularity: 1,
    skillId: "",
    orderRange: numUmas ? [1, numUmas] : null,
    numUmas
  };
  const strategyName = umaConfig.strategy ? parseStrategyName(umaConfig.strategy) : "Senkou";
  const umaSkillIds = [];
  if (umaConfig.skills) {
    for (const skillName of umaConfig.skills) {
      const skillId = findSkillIdByNameWithPreference(skillName, skillNames, skillMeta, true);
      if (!skillId) {
        console.error(`Warning: Skill "${skillName}" not found in uma.skills, skipping`);
        continue;
      }
      umaSkillIds.push(skillId);
    }
  }
  let resolvedUniqueSkillName = null;
  if (umaConfig.unique) {
    const uniqueSkillId = findSkillIdByNameWithPreference(umaConfig.unique, skillNames, skillMeta, false);
    if (!uniqueSkillId) {
      console.error(`Warning: Unique skill "${umaConfig.unique}" not found, skipping`);
    } else {
      const baseCost = skillMeta[uniqueSkillId]?.baseCost ?? 200;
      if (baseCost !== 0) {
        console.error(`Warning: Unique skill "${umaConfig.unique}" has cost ${baseCost}, expected 0`);
      }
      umaSkillIds.push(uniqueSkillId);
      resolvedUniqueSkillName = skillNames[uniqueSkillId]?.[0] ?? umaConfig.unique;
    }
  }
  const baseUma = new HorseState({
    speed: umaConfig.speed ?? 1200,
    stamina: umaConfig.stamina ?? 1200,
    power: umaConfig.power ?? 800,
    guts: umaConfig.guts ?? 400,
    wisdom: umaConfig.wisdom ?? 400,
    strategy: strategyName,
    distanceAptitude: umaConfig.distanceAptitude ?? "A",
    surfaceAptitude: umaConfig.surfaceAptitude ?? "A",
    strategyAptitude: umaConfig.styleAptitude ?? "A",
    skills: SkillSet(umaSkillIds)
  });
  const deterministic = config.deterministic ?? false;
  const simOptions = {
    seed: deterministic ? 0 : Math.floor(Math.random() * 1e9),
    useEnhancedSpurt: deterministic ? false : true,
    accuracyMode: deterministic ? false : true,
    pacemakerCount: 1,
    allowRushedUma1: deterministic ? false : true,
    allowRushedUma2: deterministic ? false : true,
    allowDownhillUma1: deterministic ? false : true,
    allowDownhillUma2: deterministic ? false : true,
    allowSectionModifierUma1: deterministic ? false : true,
    allowSectionModifierUma2: deterministic ? false : true,
    skillCheckChanceUma1: false,
    // Set to false to reduce dependency of other skills
    skillCheckChanceUma2: false
    // Set to false to reduce dependency of other skills
  };
  const configSkills = config.skills ?? {};
  const skillNameToId = {};
  const skillIdToName = {};
  const skillNameToConfigKey = {};
  for (const [skillName, skillConfig] of Object.entries(configSkills)) {
    if (skillConfig.discount === null || skillConfig.discount === void 0 || typeof skillConfig.discount !== "number") {
      continue;
    }
    const variants = findSkillVariantsByName(skillName, skillNames, skillMeta);
    if (variants.length === 0) {
      console.error(`Warning: Skill "${skillName}" not found or all variants have cost 0, skipping`);
      continue;
    }
    for (const variant of variants) {
      const skillId = variant.skillId;
      const variantSkillName = variant.skillName;
      if (umaSkillIds.includes(skillId)) {
        continue;
      }
      const currentSkillMeta = skillMeta[skillId];
      if (currentSkillMeta?.groupId) {
        const currentGroupId = currentSkillMeta.groupId;
        const currentOrder = currentSkillMeta.order ?? 0;
        let shouldSkip = false;
        for (const umaSkillId of umaSkillIds) {
          const umaSkillMeta = skillMeta[umaSkillId];
          if (umaSkillMeta?.groupId === currentGroupId && (umaSkillMeta.order ?? 0) < currentOrder) {
            shouldSkip = true;
            break;
          }
        }
        if (shouldSkip) {
          continue;
        }
      }
      skillNameToId[variantSkillName] = skillId;
      skillIdToName[skillId] = variantSkillName;
      skillNameToConfigKey[variantSkillName] = skillName;
    }
  }
  const availableSkillNames = Object.keys(skillNameToId);
  if (availableSkillNames.length === 0) {
    console.error("Error: No available skills specified in config");
    process.exit(1);
  }
  console.log("");
  const trackDetails = formatTrackDetails(
    course,
    trackNames,
    config.track.groundCondition ?? "Good",
    config.track.weather ?? "Sunny",
    config.track.season ?? "Spring",
    selectedCourseId,
    config.track.numUmas ?? 18
  );
  console.log(trackDetails);
  console.log(
    `SPD: ${baseUma.speed}, STA: ${baseUma.stamina}, PWR: ${baseUma.power}, GUTS: ${baseUma.guts}, WIT: ${baseUma.wisdom}, ${formatStrategyName(baseUma.strategy)}, APT: ${baseUma.distanceAptitude}, Unique: ${resolvedUniqueSkillName}`
  );
  console.log("");
  const confidenceInterval = config.confidenceInterval ?? 95;
  function calculateStatsFromRawResults(rawResults, cost, discount, skillName, ciPercent) {
    const sorted = [...rawResults].sort((a, b) => a - b);
    const mean = sorted.reduce((a, b) => a + b, 0) / sorted.length;
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
    const lowerPercentile = (100 - ciPercent) / 2;
    const upperPercentile = 100 - lowerPercentile;
    const lower_Index = Math.floor(sorted.length * (lowerPercentile / 100));
    const upper_Index = Math.floor(sorted.length * (upperPercentile / 100));
    const ciLower = sorted[lower_Index];
    const ciUpper = sorted[upper_Index];
    const meanLengthPerCost = mean / cost;
    return {
      skill: skillName,
      cost,
      discount,
      numSimulations: rawResults.length,
      meanLength: mean,
      medianLength: median,
      meanLengthPerCost,
      minLength: min,
      maxLength: max,
      ciLower,
      ciUpper
    };
  }
  const concurrency = Math.min(availableSkillNames.length, (0, import_os.cpus)().length);
  const workerPath = (0, import_path.resolve)(__dirname, "simulation.worker.js");
  const runSimulationInWorker = (skillName, numSimulations, returnRawResults) => {
    return new Promise((resolve2, reject) => {
      const skillId = skillNameToId[skillName];
      const worker = new import_worker_threads.Worker(workerPath, {
        workerData: {
          skillId,
          skillName,
          course,
          racedef,
          baseUma: baseUma.toJS(),
          simOptions,
          numSimulations,
          useRandomMood,
          confidenceInterval,
          returnRawResults
        }
      });
      worker.on("message", (message) => {
        if (message.success && message.result) {
          resolve2(message.result);
        } else {
          reject(new Error(message.error || "Unknown error"));
        }
        worker.terminate();
      });
      worker.on("error", (error) => {
        reject(error);
        worker.terminate();
      });
    });
  };
  const processWithConcurrency = async (items, limit) => {
    const results = [];
    const executing = [];
    for (const itemFactory of items) {
      const promise = itemFactory().then((result) => {
        results.push(result);
        executing.splice(executing.indexOf(promise), 1);
      });
      executing.push(promise);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
    await Promise.all(executing);
    return results;
  };
  const skillRawResultsMap = /* @__PURE__ */ new Map();
  for (const skillName of availableSkillNames) {
    const skillId = skillNameToId[skillName];
    const configKey = skillNameToConfigKey[skillName] || skillName;
    const skillConfig = configSkills[configKey];
    const cost = calculateSkillCost(
      skillId,
      skillMeta,
      skillConfig,
      baseUma,
      skillNames,
      configSkills,
      skillNameToId,
      skillNameToConfigKey
    );
    skillRawResultsMap.set(skillName, {
      skillName,
      rawResults: [],
      cost,
      discount: skillConfig.discount ?? 0
    });
  }
  console.log(`Running 100 simulations for all ${availableSkillNames.length} skills...`);
  const firstPassFactories = availableSkillNames.map(
    (skillName) => () => runSimulationInWorker(skillName, 100, true)
  );
  const firstPassResults = await processWithConcurrency(firstPassFactories, concurrency);
  for (const result of firstPassResults) {
    if (result.rawResults) {
      const skillData = skillRawResultsMap.get(result.skillName);
      if (skillData) {
        skillData.rawResults.push(...result.rawResults);
      }
    }
  }
  const calculateCurrentResults = () => {
    const results = [];
    for (const skillData of skillRawResultsMap.values()) {
      if (skillData.rawResults.length > 0) {
        results.push(
          calculateStatsFromRawResults(
            skillData.rawResults,
            skillData.cost,
            skillData.discount,
            skillData.skillName,
            confidenceInterval
          )
        );
      }
    }
    results.sort((a, b) => b.meanLengthPerCost - a.meanLengthPerCost);
    return results;
  };
  let currentResults = calculateCurrentResults();
  const runAdditionalSimulations = async (skillNames2, passName) => {
    if (skillNames2.length === 0)
      return;
    console.log(`Running 100 simulations for ${passName} (${skillNames2.length} skills)...`);
    const factories = skillNames2.map((skillName) => () => runSimulationInWorker(skillName, 100, true));
    const passResults = await processWithConcurrency(factories, concurrency);
    for (const result of passResults) {
      if (result.rawResults) {
        const skillData = skillRawResultsMap.get(result.skillName);
        if (skillData) {
          skillData.rawResults.push(...result.rawResults);
        }
      }
    }
    currentResults = calculateCurrentResults();
  };
  const topHalfCount = Math.ceil(currentResults.length / 2);
  const topHalfSkills = currentResults.slice(0, topHalfCount).map((r) => r.skill);
  await runAdditionalSimulations(topHalfSkills, "top half");
  const top10Skills = currentResults.slice(0, Math.min(10, currentResults.length)).map((r) => r.skill);
  await runAdditionalSimulations(top10Skills, "top 10");
  const top25PercentCount = Math.ceil(currentResults.length * 0.25);
  const top25PercentSkills = currentResults.slice(0, top25PercentCount).map((r) => r.skill);
  await runAdditionalSimulations(top25PercentSkills, "top 25%");
  const top5Skills = currentResults.slice(0, Math.min(5, currentResults.length)).map((r) => r.skill);
  await runAdditionalSimulations(top5Skills, "top 5");
  const finalResults = calculateCurrentResults();
  console.log("");
  console.log(formatTable(finalResults, confidenceInterval));
}
main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
/*! Bundled license information:

immutable/dist/immutable.js:
  (**
   * @license
   * MIT License
   * 
   * Copyright (c) 2014-present, Lee Byron and other contributors.
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   *)
*/
