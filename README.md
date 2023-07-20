# Open Oracle Origami JS SDK

Building blockchain oracles never gets better.

---

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

## Any form, any shape. Web3’s modular open oracle.
 Open Oracle Origami (OOO) believes that building and deploying an oracle for blockchain shouldn’t be rocket science. Our end goal is to allow expedient development of blockchain oracles while providing a myriad of oracle solutions to the world. The ideology is simple, based around composability and themed around the world of origami, its creation and viewership. 

 Our open-source, community-driven oracle focuses on providing reliable and decentralized data feeds as a public good. By eliminating the financial burden for users and developers, we lower barriers to entry and foster wider participation, benefiting all networks. We address the challenge of on-chain data publication by offsetting gas fees with validator rewards and utilizing them as vital infrastructure. This approach facilitates extensive historical data availability and unlocks new potential use cases.

OOO offers native pricing feeds as a public good and allows Curators to set subscriptions for their oracle's data feeds. DApps gain complimentary access to our curated Museums, while independent data providers can establish their own tailored feeds known as Collections. Curators determine subscription fees in native tokens, streamlining the user experience and enabling seamless integration of decentralized applications. With the elimination of fees, more users engage with the network, driving accelerated growth, heightened transactional activity, and increased value locked.

## Main OOO components:
* Origami: The data created by the data provider that is certified by the application. One of the main goals of the application is to transform raw data into trusted on-chain data.
* Collab : A process that converts raw data into trusted data (data certifier).
* Museum: The on-chain process that gives end users access to the data.
* Curator: The process that updates the BC with the trusted data (data updater).



## SDKs

We support follwoing SDKs 
- Origami JS SDK
- Origami Rust SDK
- Origami Solidity SDK
- Origami Cosmos SDK
- Origami MOVE SDK 



## Community data validation process:
In this scenario, data is certified through a community process. Users pay to access the results of this community process. For example, it could be an application to validate fake or real news. The producer adds news to the trusted process, and community users attempt to add fact-check elements. When there are enough checks, the news is considered true, and a link or summary is written on-chain.
Users who want access to certified news pay to access the on-chain information.


## Install the JS SDK

Clone the project


```bash
yarn add @open-oracle-origami/origami-js-sdk
```

## Usage

```ts
import { Curator, Origami } from '@open-oracle-origami/origami-js-sdk'

const origami = new Origami()

Curator.curate(origami)
//=> 'curator node running'
```

## Features

- **Reliable Data Feeds**: Obtain real-time data from trusted sources and securely deliver it to smart contracts.
- **Decentralized Consensus**: Utilize consensus algorithms to verify and validate the accuracy of data.
- **Data Integrity and Security**: Protect data against tampering and ensure the reliability of the oracle network.
- **Flexible Integration**: Seamlessly integrate Open Oracle Origami with various blockchain platforms and protocols.
- **Developer-Friendly SDKs**: Provide easy-to-use SDKs for developers to interact with the oracle network.

## Contributing
Contributions are always welcome! Our source code is licensed under the MIT License, and contributions are welcome.

See [contributing](https://github.com/open-oracle-origami/origami-js-sdk/blob/main/CONTRIBUTING.md) for ways to get started.

Please adhere to our [code of conduct](https://github.com/open-oracle-origami/origami-js-sdk/blob/main/CODE_OF_CONDUCT.md).

## License
[MIT](https://choosealicense.com/licenses/mit/)

More Documentation coming soon...

[build-img]:https://github.com/open-oracle-origami/origami-js-sdk/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/open-oracle-origami/origami-js-sdk/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/@open-oracle-origami/origami-js-sdk
[downloads-url]:https://npmtrends.com/@open-oracle-origami/origami-js-sdk
[npm-img]:https://img.shields.io/npm/v/@open-oracle-origami/origami-js-sdk
[npm-url]:https://www.npmjs.com/package/@open-oracle-origami/origami-js-sdk
[issues-img]:https://img.shields.io/github/issues/open-oracle-origami/origami-js-sdk
[issues-url]:https://github.com/open-oracle-origami/origami-js-sdk/issues
[codecov-img]:https://codecov.io/gh/open-oracle-origami/origami-js-sdk/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/open-oracle-origami/origami-js-sdk
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/
