
<a name="readmemd"></a>

[commanderdoc - v0.1.9](#readmemd) › [Globals](#globalsmd)

# commanderdoc - v0.1.9

# Usage
```bash
commanderdoc [options] [command]
```
# Commands
## markdown \<`sourcefile`>
### Usage
```bash
commanderdoc markdown [options] <sourcefile>
```
### Options
* -e --exported \<`commanderObject`> Name of the exported commander object to inspect (default: `commander`)
* -o --out-file \<`outfile`> File to store markdown output (defaults to stdout) 
* -n --cli-name \<`name`> Name of the executable 
## json \<`sourcefile`>
Extract inspected commander as JSON
### Usage
```bash
commanderdoc json [options] <sourcefile>
```
### Options
* -e --exported \<`commanderObject`> Name of the exported commander object to inspect (default: `commander`)
* -o --out-file \<`outfile`> File to store markdown output (defaults to stdout)


<a name="globalsmd"></a>

[commanderdoc - v0.1.9](#readmemd) › [Globals](#globalsmd)

# commanderdoc - v0.1.9

## Index

### Type aliases

* [CommandType](#commandtype)
* [OptionType](#optiontype)

### Functions

* [commandToMd](#commandtomd)
* [commanderToMd](#commandertomd)
* [getCommand](#getcommand)
* [getCommands](#getcommands)
* [getOption](#getoption)
* [getOptions](#getoptions)
* [optionToMd](#optiontomd)
* [padLevel](#padlevel)

## Type aliases

###  CommandType

Ƭ **CommandType**: *object*

*Defined in [index.ts:42](https://github.com/rhdeck/commanderdoc/blob/7f7d771/src/index.ts#L42)*

#### Type declaration:

* **args**? : *object[]*

* **commands**? : *[CommandType](#commandtype)[]*

* **description**? : *undefined | string*

* **name**: *string*

* **options**? : *[OptionType](#optiontype)[]*

___

###  OptionType

Ƭ **OptionType**: *ReturnType‹typeof getOption›*

*Defined in [index.ts:41](https://github.com/rhdeck/commanderdoc/blob/7f7d771/src/index.ts#L41)*

## Functions

###  commandToMd

▸ **commandToMd**(`command`: [CommandType](#commandtype), `startLevel`: number, `parents`: string[]): *string*

*Defined in [index.ts:104](https://github.com/rhdeck/commanderdoc/blob/7f7d771/src/index.ts#L104)*

Convert an inspected command to a markdown string

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`command` | [CommandType](#commandtype) | - | inspected command to inspect (result of getCommand(command)) |
`startLevel` | number | 1 | header level to start with |
`parents` | string[] | [] | list of parent commands and cli name to document usage  |

**Returns:** *string*

___

###  commanderToMd

▸ **commanderToMd**(`commander`: object, `cliName`: string, `startLevel`: number): *string*

*Defined in [index.ts:172](https://github.com/rhdeck/commanderdoc/blob/7f7d771/src/index.ts#L172)*

Document a top-level cli - recommended use case

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`commander` | object | - | Top level commander object (usually from `export commander` or `module.exports.commander = commander`) |
`cliName` | string | - | Name of the executable (for usage documentation) |
`startLevel` | number | 1 | Level to start the markdown headers (e.g. use 2 or greater to fit it into sub-documentation)  |

**Returns:** *string*

___

###  getCommand

▸ **getCommand**(`command`: object): *[CommandType](#commandtype)*

*Defined in [index.ts:60](https://github.com/rhdeck/commanderdoc/blob/7f7d771/src/index.ts#L60)*

Generate a map of properties of a command object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`command` | object | Commander command object to inspect  |

**Returns:** *[CommandType](#commandtype)*

___

###  getCommands

▸ **getCommands**(`commands`: object[]): *[CommandType](#commandtype)[]*

*Defined in [index.ts:53](https://github.com/rhdeck/commanderdoc/blob/7f7d771/src/index.ts#L53)*

Recursively inspect a list of commands

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`commands` | object[] | List of commands to inspect (usually from `command.commands`)  |

**Returns:** *[CommandType](#commandtype)[]*

___

###  getOption

▸ **getOption**(`option`: object): *object*

*Defined in [index.ts:13](https://github.com/rhdeck/commanderdoc/blob/7f7d771/src/index.ts#L13)*

Get filtered list of attributes for a single options

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`option` | object | Option for a commands  |

**Returns:** *object*

* **args**: *any*

* **defaultValue**: *any*

* **description**: *any*

* **flags**: *any*

* **long**: *any*

* **mandatory**: *any*

* **negate**: *any*

* **optional**: *any*

* **required**: *any*

* **short**: *any*

* **variadic**: *any*

___

###  getOptions

▸ **getOptions**(`options`: any[]): *object[]*

*Defined in [index.ts:7](https://github.com/rhdeck/commanderdoc/blob/7f7d771/src/index.ts#L7)*

Get filtered map of attributes for a list of options

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | any[] | Options for a command  |

**Returns:** *object[]*

___

###  optionToMd

▸ **optionToMd**(`option`: [OptionType](#optiontype)): *string*

*Defined in [index.ts:87](https://github.com/rhdeck/commanderdoc/blob/7f7d771/src/index.ts#L87)*

Generate markdown for a single commander option

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`option` | [OptionType](#optiontype) | Option to generate markdown for  |

**Returns:** *string*

___

###  padLevel

▸ **padLevel**(`level`: number): *string*

*Defined in [index.ts:81](https://github.com/rhdeck/commanderdoc/blob/7f7d771/src/index.ts#L81)*

Generate a markdown header prefix at the indicated level

**`internal`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`level` | number | level of the markdown header padding  |

**Returns:** *string*
