
<a name="readmemd"></a>

[commanderdoc - v0.1.2](#readmemd) › [Globals](#globalsmd)

# commanderdoc - v0.1.2

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
* -e --exported \<`commanderObject`> Name of the exported commander object to inspect (default: commander
* -o --out-file \<`outfile`> File to store markdown output (defaults to stdout) 
* -n --cli-name \<`name`> Name of the executable 
## json \<`sourcefile`>
Extract inspected commander as JSON
### Usage
```bash
commanderdoc json [options] <sourcefile>
```
### Options
* -e --exported \<`commanderObject`> Name of the exported commander object to inspect (default: commander
* -o --out-file \<`outfile`> File to store markdown output (defaults to stdout)


<a name="globalsmd"></a>

[commanderdoc - v0.1.2](#readmemd) › [Globals](#globalsmd)

# commanderdoc - v0.1.2

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

*Defined in [index.ts:35](https://github.com/rhdeck/commanderdoc/blob/1ff27fe/src/index.ts#L35)*

#### Type declaration:

* **args**? : *object[]*

* **commands**? : *[CommandType](#commandtype)[]*

* **description**? : *undefined | string*

* **name**: *string*

* **options**? : *[OptionType](#optiontype)[]*

___

###  OptionType

Ƭ **OptionType**: *ReturnType‹typeof getOption›*

*Defined in [index.ts:34](https://github.com/rhdeck/commanderdoc/blob/1ff27fe/src/index.ts#L34)*

## Functions

###  commandToMd

▸ **commandToMd**(`command`: [CommandType](#commandtype), `startLevel`: number, `parents`: string[]): *string*

*Defined in [index.ts:75](https://github.com/rhdeck/commanderdoc/blob/1ff27fe/src/index.ts#L75)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`command` | [CommandType](#commandtype) | - |
`startLevel` | number | 1 |
`parents` | string[] | [] |

**Returns:** *string*

___

###  commanderToMd

▸ **commanderToMd**(`c`: object, `cliName`: string, `startLevel`: number): *string*

*Defined in [index.ts:138](https://github.com/rhdeck/commanderdoc/blob/1ff27fe/src/index.ts#L138)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`c` | object | - |
`cliName` | string | - |
`startLevel` | number | 1 |

**Returns:** *string*

___

###  getCommand

▸ **getCommand**(`o`: object): *[CommandType](#commandtype)*

*Defined in [index.ts:45](https://github.com/rhdeck/commanderdoc/blob/1ff27fe/src/index.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | object |

**Returns:** *[CommandType](#commandtype)*

___

###  getCommands

▸ **getCommands**(`commands`: object[]): *[CommandType](#commandtype)[]*

*Defined in [index.ts:42](https://github.com/rhdeck/commanderdoc/blob/1ff27fe/src/index.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`commands` | object[] |

**Returns:** *[CommandType](#commandtype)[]*

___

###  getOption

▸ **getOption**(`o`: object): *object*

*Defined in [index.ts:6](https://github.com/rhdeck/commanderdoc/blob/1ff27fe/src/index.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`o` | object |

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

*Defined in [index.ts:3](https://github.com/rhdeck/commanderdoc/blob/1ff27fe/src/index.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | any[] |

**Returns:** *object[]*

___

###  optionToMd

▸ **optionToMd**(`option`: [OptionType](#optiontype), `startLevel`: number): *string*

*Defined in [index.ts:64](https://github.com/rhdeck/commanderdoc/blob/1ff27fe/src/index.ts#L64)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`option` | [OptionType](#optiontype) | - |
`startLevel` | number | 1 |

**Returns:** *string*

___

###  padLevel

▸ **padLevel**(`level`: number): *string*

*Defined in [index.ts:61](https://github.com/rhdeck/commanderdoc/blob/1ff27fe/src/index.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`level` | number |

**Returns:** *string*
