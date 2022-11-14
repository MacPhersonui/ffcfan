// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat")
const { ethers, upgrades } = require("hardhat")
const Reward = artifacts.require("Reward")
const USDT = artifacts.require("USDT")
const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms))

async function main() {
    await hre.run("compile")

    this.deployer = (await ethers.getSigners())[0].address
    console.log("deployer address", this.deployer)

    // this.USDT = await USDT.new()
    // await this.USDT.addMinter(this.deployer)
    // console.log("USDT address", this.USDT.address)
    // this.Reward = await Reward.new("0xa1fE3DDBe189D804e51C29772d222ac1f155E58e")
    // console.log("Reward address", this.Reward.address)
    // await this.USDT.mint(this.deployer , hre.ethers.utils.parseEther("10000000", "ether"))

    // await this.Reward.setInvite(
    //     [
    //         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    //         "0x948539c2187F85482E71645e549Ac146A2e0A987",
    //         "0x343e53D0d06FBF692336CcF871d4c89aD8B706Be"
    //     ],
    //     [
    //         "0x948539c2187F85482E71645e549Ac146A2e0A987",
    //         "0x343e53D0d06FBF692336CcF871d4c89aD8B706Be",
    //         "0x09C673FE94F53C5eF94A2119F8317C7B1D1e980d",
    //     ]
    // )
    // console.log("setInvite")


    // await this.Reward.setLPvalue(
    //     [
    //         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    //         "0x948539c2187F85482E71645e549Ac146A2e0A987",
    //         "0x09C673FE94F53C5eF94A2119F8317C7B1D1e980d",
    //         "0x343e53D0d06FBF692336CcF871d4c89aD8B706Be"
    //     ],
    //     [
    //         hre.ethers.utils.parseEther("10000", "ether"),
    //         hre.ethers.utils.parseEther("100", "ether"),
    //         hre.ethers.utils.parseEther("100", "ether"),
    //         hre.ethers.utils.parseEther("100", "ether")
    //     ]
    // )
    // console.log("setLPvalue")

    // await this.Reward.setTimeline(parseInt((new Date().getTime()) / 1000)+1000)
    // console.log("setTimeline")

    // console.log("getLPReward", (await this.Reward.getLPReward("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
    // console.log("getLPL2Reward", (await this.Reward.getLPL2Reward("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
    // console.log("getLPL2Amount", (await this.Reward.getLPL2Amount("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
    // console.log("getLPL3Reward", (await this.Reward.getLPL3Reward("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
    // console.log("getLPL3Amount", (await this.Reward.getLPL3Amount("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())

    // console.log("getTORReward", (await this.Reward.getTORReward("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
    // console.log("getTORL2Reward", (await this.Reward.getTORL2Reward("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
    // console.log("getTORL3Reward", (await this.Reward.getTORL3Reward("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())

    // console.log("getLPtotal", (await this.Reward.getLPtotal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
    // console.log("getTORtotal", (await this.Reward.getTORtotal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
    
    // // await this.Reward.getReward()
    // console.log("USDT", hre.ethers.utils.formatEther((await this.USDT.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString()))


    // await this.Reward.setLPvalue(
    //     [
    //         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    //         "0x948539c2187F85482E71645e549Ac146A2e0A987",
    //         "0x09C673FE94F53C5eF94A2119F8317C7B1D1e980d",
    //         "0x343e53D0d06FBF692336CcF871d4c89aD8B706Be"
    //     ],
    //     [
    //         hre.ethers.utils.parseEther("10000", "ether"),
    //         hre.ethers.utils.parseEther("100", "ether"),
    //         hre.ethers.utils.parseEther("100", "ether"),
    //         hre.ethers.utils.parseEther("100", "ether")
    //     ]
    // )
    // await this.Reward.setLPvalue(
    //     [
    //         "0x71406F02E20E0B3C0214509fe7dB7d434c9D13D2",
    //     ],
    //     [
    //         hre.ethers.utils.parseEther("10000", "ether"),
    //     ]
    // )
    // await this.Reward.setTimeline(parseInt((new Date().getTime()) / 1000) + 2000)



    // console.log("getLPtotal", (await this.Reward.getLPtotal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
    // console.log("getTORtotal", (await this.Reward.getTORtotal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString())
    // await this.Reward.getReward()
    // console.log("USDT", hre.ethers.utils.formatEther((await this.USDT.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")).toString()))


    this.Reward = await hre.ethers.getContractAt("Reward", "0x7E28973DA5907535C44515CA28B450CCBe6F482D")
    console.log("getLPReward", (await this.Reward.getLPReward("0xf083aAc36c07CA7E25686699C99442cCd74736e8")).toString())
    console.log("getLPL2Reward", (await this.Reward.getLPL2Reward("0xf083aAc36c07CA7E25686699C99442cCd74736e8")).toString())
    console.log("getLPL2Amount", (await this.Reward.getLPL2Amount("0xf083aAc36c07CA7E25686699C99442cCd74736e8")).toString())
    console.log("getLPL3Reward", (await this.Reward.getLPL3Reward("0xf083aAc36c07CA7E25686699C99442cCd74736e8")).toString())
    console.log("getLPL3Amount", (await this.Reward.getLPL3Amount("0xf083aAc36c07CA7E25686699C99442cCd74736e8")).toString())
    // console.log("getTORReward", (await this.Reward.getTORReward("0xf083aAc36c07CA7E25686699C99442cCd74736e8")).toString())
    // console.log("getTORL2Reward", (await this.Reward.getTORL2Reward("0xf083aAc36c07CA7E25686699C99442cCd74736e8")).toString())
    // console.log("getTORL3Reward", (await this.Reward.getTORL3Reward("0xf083aAc36c07CA7E25686699C99442cCd74736e8")).toString())
    console.log(await this.Reward.getReferrer("0xf083aAc36c07CA7E25686699C99442cCd74736e8"))
    // await this.Reward.setInvite(["0xf083aAc36c07CA7E25686699C99442cCd74736e8"], ["0x7E28973DA5907535C44515CA28B450CCBe6F482D"])

    // await this.Reward.setTORvalue(
    //     ["0xd884e5ca2d3a051da7346be6e7cbe01723fda795",
    //         "0xdcb438c1aa8bf3d3f6291da4b802d3c0e2e2631f",
    //         "0x343e53d0d06fbf692336ccf871d4c89ad8b706be",
    //         "0x2fe67c628ee85379b3e1c5ee94eebd39eba4e587",
    //         "0x8a50ec2e3f0fdb16d673c313027291af5579df92",
    //         "0x9d269e964fce5e31e242eb457c3280b8f61bbc8a",
    //         "0xbaf383b20f9e660afa12cc9db5f7a36fd84ec5b0",
    //         "0x374d16dbafcb34da7421fb6fc5eb9d529ac05585",
    //         "0xd415f6e10c3845f66b84fd07c5a8dcc896fb72ff",
    //         "0x572a0d3598cbe670d3ebb5d6cf05d29f640c237e",
    //         "0x2583131b839de5735d5db8c0eb6ea043abfad384",
    //         "0x7bffbcfdebc71098d9d443ab939fd535abc78433",
    //         "0x736b4bbf716822ac9e64f61d92fe068240b6af37",
    //         "0xb4acdc19240baead5a27b9917045df616038fdd9",
    //         "0xe8957c5d43414fb9544eabe2a348d621883e2707",
    //         "0x214a3b74e4e64f4ca99757cb5758dea184a95f05",
    //         "0x5996bb68b48ec77118997e8683456f54b0e8a4fc",
    //         "0xc54605002d093ddec310e508d9a96041778d7874",
    //         "0x8ee0f546281f1f120adafe23f3cdf854813d3364",
    //         "0x5ce2eee128f91a9dedf4e8975af8b60fc3591eaf",
    //         "0xd26b7a8f44c21fbe769352191342a1e423626537",
    //         "0x406a150bac5d3aa8700383af67b8619fe92ca957",
    //         "0x634a97f0b4a3fac3eed4a7338487a8d7723a2c14",
    //         "0xa0f6c22ebd04e2be0c142f7b867f6fc2779ce824",
    //         "0x0649c90aecff0a17cbc8ad7cfcee3e845334d8ba",
    //         "0xe462746350daa359b8ff0bd1e21107ef94cb5cb8",
    //         "0x96a86066554c5714e53a18784442e18b1b8a49db",
    //         "0x78737a473ec59f3f595e27b9b0bd5d505ed491d8",
    //         "0x3657f53c1e1746dd965c3869bb5265dae18c7121",
    //         "0x7e28973da5907535c44515ca28b450ccbe6f482d",
    //         "0x1fc3235e8f60d5996567268315c47c255e254d75",
    //         "0xd29bf0273bece2e34c2d90e5058202bc4d21140c",
    //         "0xa455adc9f1246ae09518650b1f2f2a4fc102850b",
    //         "0x7ac43894107267c3b9a6cb70e94fd47556bd656e",
    //         "0xc36a23e21268e49a67f0cb702050f9dfbc03ee5c",
    //         "0xe14ed010967c6441755fac01a36537eaa3d5c0f0",
    //         "0x2cdc4a2c7ecc8294fa2c5b21e75f38c2d6b1617e",
    //         "0xf32fa505223e724b4ae440e8135d8f09c1757ada",
    //         "0x3d5a13fdcf9d42b7905421d879f990dedecaee71",
    //         "0x7ed77e035c23456c5f15adec6dc273bfa39b633c",
    //         "0x3b58da4cc6a9a74bcbcdea6b4cd9e636ea8acde2",
    //         "0xb921a73757059dad26a9a3cbdee8fc8483014aa7",
    //         "0xc88cb09959727f5957853fd4d44554e3f9a0bc07",
    //         "0x5a9f82e03695085c6bb922fd232938e2b072a5cd",
    //         "0x323eb9457d72b20b874493e7b72371a3733db7c3",
    //         "0xaae1d6e160b6d0c86b3ddfecfb444ad9817f6396",
    //         "0xc92642e78301891366bd9d49c5ac71cbb2c0909f",
    //         "0x03c4d5fbd75c48ed4d01fb534a8258e8ba1bb87c",
    //         "0x50545ca828447df7cda4a22f1650a002fbad72a2",
    //         "0x516f7fb7d84b5f51aadc0aacc34d3b0ff7d6c759",
    //         "0x6e437e85b4615304b3e2beac7eb0f2b0844e3656",
    //         "0xc4e8f5c1a18d82d6a572c36388a8912ab24a82f5",
    //         "0xfbc9ccbe3a2a0c4f78550bf19c758e61121f6885",
    //         "0x9fc66e5d0dadf919e7ee63292b5f0d12623e1747",
    //         "0xd51fe69a363e62ad8a6fe0d37066c29e1be9c7e8",
    //         "0x22c67d6af140266938200955fcdad3fb67ccf026",
    //         "0x8702925843b7d4f4b4474fc5747e77c4803fc6a2",
    //         "0xe064436d1c2935d2c9fa0894b94ba8bef7bc101d",
    //         "0xaa345e9d0b80af84fabfd97b56b8a93491083976",
    //         "0x4247597e898ac85e048b69f75e28e260e9fcd171",
    //         "0xe161add740d6852078777b4fff50194e06fee76c",
    //         "0x80c14edc8ad81c91ed5aa053eb2d99d1b97de37f",
    //         "0xf4d7d33552807194790c6cb95b3ce73298ed7e8f",
    //         "0xf30a26e7528debd0cc2886ccca92d58fbc0a5e1e",
    //         "0x4cdd6708eed5e4c3e5a50a96cb6253cab02cb4dc",
    //         "0x62e993400d86ceaa6919333267153af98502b5ad",
    //         "0xf0e222f03926f58c109ac86a9677045c91dfbcfb",
    //         "0x98fb198c96de5107f1bbeb6edf96f3d267a6c7ed",
    //         "0x1b1c016b92052861bda873cc77372ee937dbb226",
    //         "0x1b9e57641a32563aacebbb509ae5b661e322c380",
    //         "0x5575538630beaa4c78868ef9bc23630b8798a093",
    //         "0x8aa5be2bb58a66957569f3e52df89b4eb2dddbf4",
    //         "0x18c33ef0b6c5ced1e3dccc6b125c3fb4870f0319",
    //         "0xbf6a1b9ed9bc5dcdf3623777663850e21b3e8049",
    //         "0x4ab8256671a7fa5f4e80a2363ee80c8175ccfd13",
    //         "0x1d401514e53e890717363855a4705fe02af9f8e7",
    //         "0x8789fa9a305838fcc4e5362ea0b9c211b4438e95",
    //         "0x2239becdc87d921c68996be82e65d013e117f2c9",
    //         "0x8b4bbde1af089a7d5a75dad9a392c08a0b7e732b",
    //         "0xca1a044de0857ae0109c07b3beebbff7b44c096f",
    //         "0x30168a9c8980811fd97149fab75f37d81a0d423e",
    //         "0x21ee38f7b9c5068c0588ae064ee142518e920fd4",
    //         "0xa5b6e2d3421563baa0fd753860d5c0cd978f04fd",
    //         "0x1608382d6c1e5b18a4bb97f0afb6f081943f6801",
    //         "0xaf6406b34ebd2f3d6349e9eab5d3acaeff9c71e6",
    //         "0x1b959e9e89123e4409d170da0aecf70496f9935b",
    //         "0xf083aac36c07ca7e25686699c99442ccd74736e8",
    //         "0xacd68b82ed80ab701cafe69f3c9a09fe75a4e5a0",
    //         "0xe17f8fe3fea8d3b1661352e1f55fb44163139475",
    //         "0xd876d06792871d4642c3a8f9fc1de408953e9db9",
    //         "0xf62432ac6fbc5a9e8129faeb4c173e10427d8214",
    //         "0x63584273f9f8b46b6c3349c41b46ad1632d3b529",
    //         "0xcefb7169141200bdc76e7f67248e7eb9647a89f4",
    //         "0xed86815e7fe3eedf44503f6b953bc025d63d4363",
    //         "0x558a1e308a49087d6da67b44d869c89e48412825",
    //         "0x4a6a4a58360da6f9720b2056afb5c133be5c33a0",
    //         "0x3ab4a1be1b0e6c9f90b2351427510005c5d38267",
    //         "0x43c2f2856fdc85a4ebcc3f21e162ad00284178fa",
    //         "0x37433e42de9c86934011745472cdf9856d209e3e",
    //         "0xe512ffb1a01b0ab844ea32b90aa18f69b2e672b6",
    //         "0x8405253ab2108a00e400907c33259d95a1df80ef",
    //         "0x5877e421a682bd0b34c3a8b1a54affd856e4f72d",
    //         "0xea0cbbced7c10373e91522402f8bd9f39e719d70",
    //         "0xec427c3d8cf6cdcdb560cd8445c94de4df837d32",
    //         "0xf734288510a100fef45951cd556fbcd18eb796d5",
    //         "0xa2b724a8fd583a56990d98ddf3a66aa91a6221be",
    //         "0x6768d5d45da853825bdb713a7ef2f82921a45160",
    //         "0x45e13d32c307b306b498857c2f2641285dde2564",
    //         "0x59aa9a569ba61c49f05c54080a34b256dc787acc",
    //         "0x83bfe11ee9cdc74c8de802d448f1cf9d55772286",
    //         "0x2d5a16658fb77784704995183a0c6d31e9647369",
    //         "0x88c6355f947310e0953b744baef3332c50d81132",
    //         "0x99c1b6d4e8fe4c17185571d4a6194a444533a9f0",
    //         "0x594c638c62fb8496b8773eb00a3bc523894fd33c",
    //         "0x7178ddd43eaddf3d52681f4c6bfc75eabd95f972",
    //         "0x086e4394a13677b7c35700a53da08ae8f3a6c3b6",
    //         "0x7399e6e4274ff77a62fe99a89d772779b4dc068e",
    //         "0x41540ce64415ed8ccad09a65ce95c4a6710c6da4",
    //         "0x44037fabfab0baa6cb8f0c07abd3140df910f504",
    //         "0x55774fc8dddfe8bab484c75fb84072904ffafcc8",
    //         "0x0757470921924de293ed3576a7b2693aefed8e2b",
    //         "0x13255fc7bcc5a7ba8740f7da8175f54782fff9ed",
    //         "0xa64187323ed4e87ec870cd9182ae6189d64c563d",
    //         "0xaa59bbe56fac1bbb55cef810d3c039f4b5da20bc",
    //         "0xab990226eb63cdbbe032d68d6f7f3ed23dc375b6",
    //         "0xfd951ca86d5d151336f4a81de6c6703f7ebb0eca",
    //         "0xea737eefd1eb2e278eba0f2e0f0bc1873f6bf622",
    //         "0xe86331d5f02cd28b88294dbbc6a1877a203c74f2",
    //         "0xe80812a1a900895942ea0e10c2eadadd255509fc",
    //         "0xdb5d3b95587cb86f2d22061c4522cae4ead8ef3b",
    //         "0xdefe913df07d0bb2bc9b1d5d7848377ad902556a",
    //         "0xd9f7325448399b0e53c1a2b568e361efc524f48a",
    //         "0xd107a70bbc072d5114bf43efc766a97923c08b8c",
    //         "0xcc91bf5ad0b048a24dd608a51eda25feb6d5a82c",
    //         "0xca5e33547de6350503b1c2d42c1f4f20a0088223",
    //         "0x6450f6c490f3b06a7594fed36b791f48b3bf8193",
    //         "0x0ec10aaa4ebd6b901d22fd41213ac4a8574a3972",
    //         "0x85cdbe8aa100d96340233f59bb2b7c5d289c7ee8",
    //         "0x8585090aef184ef7f3a5747277a825f91af58adf",
    //         "0x56e7984f7d3891b4bf6acf8860968194873168a3",
    //         "0x0b7b2ceabae374df3447d7ae1a18e957dd243132",
    //         "0xa3a08280d9c7960fc73dfe5bbde70ea6c4ff513e",
    //         "0x7d8c6bea2ceffbbed3640d44933c3b1570e5033e",
    //         "0x2c93133533a6e481d4955568dd226acc47b00fd9",
    //         "0xb16df13deee43af7e98345d440a0340841a2b273",
    //         "0x9b6cde6424df177fead4a93eabedcb5a5a216b0d",
    //         "0x79e791ad164610379f6815ab41582459cb142c6c",
    //         "0xa39460e4918848c9cb26aa9955e79b8bac01bf33",
    //         "0xa19919cab1f96aa65c5409d3ddd3a0e582d3d550",
    //         "0x53a78e1974614256cd292e2d7e6ea1fb7337ebca",
    //         "0x1d8106e193de66831387c0bdbbff94203fd3cd36",
    //         "0xfc018a9d50641e3e5b7b79eb6252d10fecae5ea4",
    //         "0x80c5922825f654e57f7641a3f89903821594cf90",
    //         "0xfe5d934fef31627f358e2e12ff7eac84a9225652",
    //         "0xf8d9649c9f13b20ab8a80a748a73f79c841bda27",
    //         "0x485877adf561de9be2990f071ec25447f6dc81c3",
    //         "0x576d9d9e8c22487224c793ddefd15e6f9ce76813",
    //         "0xe6b985a34bedba345c109914d4a4433b304b2ff9",
    //         "0xe1a44142773f11742f34f28d7a72e71c0e3ab282",
    //         "0xefe6fa2013d2b408c953ddbfec31c147d38a4d4e",
    //         "0x1c56ef744b65cf757810ddeb5d4ef94dc13020bf",
    //         "0x1dbeef72257c6c482bb30be3a378c8ae62f6ae3b",
    //         "0x2d6ec8ac60d3bb18f258444316b938be28c89ae0",
    //         "0x266e64be3f63b5cf452ac976f2b097c1af06b9a5",
    //         "0x32e3247cc5bf3028c98539dbf73a6f42c8ad28a4",
    //         "0x8327d99fb7b263f83394d64a1ef1de10d5ecdda1",
    //         "0xc9e6bde1daedcd00ccd664e220ba524320315617",
    //         "0xb8b232d6a5306fae377dae006885c757640ec64a",
    //         "0xc413c9b56a787484ae3d603dd614d7d444f443bc",
    //         "0xdb4e7176a1a750ee8df817e963eb41a633679308",
    //         "0x3003de625382965f051ba0ad68d20ee76407075c",
    //         "0x85c29e8a8669a3396791ba3dd2791a8473badb63",
    //         "0x2c64e09c45b657f1992a7fbe15afb176f3596668",
    //         "0xdda5b10b9fc5efadf45a7896ba94f647f3a71139",
    //         "0x3b46343e68c8e786f56dd8007508c26e3ab1c026",
    //         "0x66433f5226fc4ba685d15b32c77ee6cccf658e2b",
    //         "0xe061b1bc4364f6da7b6c11f8e6e9f787a887131f",
    //         "0x4a361db6919e11b160e58fc1c66083f97f8f2a6b",
    //         "0x81dd3421cc9cb8eb557a207cb56d16b547de8de1",
    //         "0x01727ecdc03b5afa66b5f8e99511b21280cd2fbc",
    //         "0x752f0043dc57e5e0a2f1e4505019b4eba486e3c1",
    //         "0xf3c5ea616156a5cee517e5428ba1e1c8b618c34d",
    //         "0xfece23e829cc624bc639494a25b90656a61efc36",
    //         "0x1ff66cfe8f7b18dcd3f60f8c55cbcdfd71e93858",
    //         "0x0285f1d800a17a5f5df38848168266203876bee0",
    //         "0x5d714dca3d5c0296a98795dfe6376d041f5f7932",
    //         "0x6cef2e8cc54c0395a02ab7c476f42db1e4bcda18",
    //         "0xa1fe3ddbe189d804e51c29772d222ac1f155e58e",
    //         "0xb28d15ab4f75eb83ebdf07319c6ecf8959202a35",
    //         "0x638f32fe09baec1fdc54f962e3e8e5f2b286aa70",
    //         "0xd2d294aeaa615568643bc20fe540f21aa7df5e72",
    //         "0x98260900a91782561d06fb2e2e614f72027d4502",
    //         "0xe537476491267f466f3eb5a52f138987e51c1e4f",
    //         "0xbdeb1fed5b2b192642b2043d909fbba2a2dbe408",
    //         "0x25a156b6e1c0871038959abbc7eede9d1b6bca2f",
    //         "0xc4c18dc758bfee2f6eec33e24896203bc588818e",
    //         "0xd0e4f37304c56ba1caff7db768d48cf837388ee7",
    //         "0x47dc1daa5c75ce31e9e3c30c43570a1623a57dd6"
    //     ], [hre.ethers.utils.parseEther("504.44", "ether"),
    //         hre.ethers.utils.parseEther("428.03", "ether"),
    //         hre.ethers.utils.parseEther("166.06", "ether"),
    //         hre.ethers.utils.parseEther("112.32", "ether"),
    //         hre.ethers.utils.parseEther("100.83", "ether"),
    //         hre.ethers.utils.parseEther("93.80", "ether"),
    //         hre.ethers.utils.parseEther("93.60", "ether"),
    //         hre.ethers.utils.parseEther("93.51", "ether"),
    //         hre.ethers.utils.parseEther("93.13", "ether"),
    //         hre.ethers.utils.parseEther("92.61", "ether"),
    //         hre.ethers.utils.parseEther("89.05", "ether"),
    //         hre.ethers.utils.parseEther("89.05", "ether"),
    //         hre.ethers.utils.parseEther("89.05", "ether"),
    //         hre.ethers.utils.parseEther("89.05", "ether"),
    //         hre.ethers.utils.parseEther("87.09", "ether"),
    //         hre.ethers.utils.parseEther("86.09", "ether"),
    //         hre.ethers.utils.parseEther("84.60", "ether"),
    //         hre.ethers.utils.parseEther("84.60", "ether"),
    //         hre.ethers.utils.parseEther("84.60", "ether"),
    //         hre.ethers.utils.parseEther("83.12", "ether"),
    //         hre.ethers.utils.parseEther("73.30", "ether"),
    //         hre.ethers.utils.parseEther("71.74", "ether"),
    //         hre.ethers.utils.parseEther("66.97", "ether"),
    //         hre.ethers.utils.parseEther("64.43", "ether"),
    //         hre.ethers.utils.parseEther("59.90", "ether"),
    //         hre.ethers.utils.parseEther("59.40", "ether"),
    //         hre.ethers.utils.parseEther("56.70", "ether"),
    //         hre.ethers.utils.parseEther("55.56", "ether"),
    //         hre.ethers.utils.parseEther("53.94", "ether"),
    //         hre.ethers.utils.parseEther("50.29", "ether"),
    //         hre.ethers.utils.parseEther("48.59", "ether"),
    //         hre.ethers.utils.parseEther("41.54", "ether"),
    //         hre.ethers.utils.parseEther("40.72", "ether"),
    //         hre.ethers.utils.parseEther("38.72", "ether"),
    //         hre.ethers.utils.parseEther("34.99", "ether"),
    //         hre.ethers.utils.parseEther("34.03", "ether"),
    //         hre.ethers.utils.parseEther("32.60", "ether"),
    //         hre.ethers.utils.parseEther("30.93", "ether"),
    //         hre.ethers.utils.parseEther("30.22", "ether"),
    //         hre.ethers.utils.parseEther("27.73", "ether"),
    //         hre.ethers.utils.parseEther("25.45", "ether"),
    //         hre.ethers.utils.parseEther("24.41", "ether"),
    //         hre.ethers.utils.parseEther("23.83", "ether"),
    //         hre.ethers.utils.parseEther("21.59", "ether"),
    //         hre.ethers.utils.parseEther("21.41", "ether"),
    //         hre.ethers.utils.parseEther("20.62", "ether"),
    //         hre.ethers.utils.parseEther("18.90", "ether"),
    //         hre.ethers.utils.parseEther("17.81", "ether"),
    //         hre.ethers.utils.parseEther("14.46", "ether"),
    //         hre.ethers.utils.parseEther("14.45", "ether"),
    //         hre.ethers.utils.parseEther("14.44", "ether"),
    //         hre.ethers.utils.parseEther("14.44", "ether"),
    //         hre.ethers.utils.parseEther("12.53", "ether"),
    //         hre.ethers.utils.parseEther("11.95", "ether"),
    //         hre.ethers.utils.parseEther("11.64", "ether"),
    //         hre.ethers.utils.parseEther("9.07", "ether"),
    //         hre.ethers.utils.parseEther("8.59", "ether"),
    //         hre.ethers.utils.parseEther("8.31", "ether"),
    //         hre.ethers.utils.parseEther("8.18", "ether"),
    //         hre.ethers.utils.parseEther("7.61", "ether"),
    //         hre.ethers.utils.parseEther("7.42", "ether"),
    //         hre.ethers.utils.parseEther("6.46", "ether"),
    //         hre.ethers.utils.parseEther("5.65", "ether"),
    //         hre.ethers.utils.parseEther("5.15", "ether"),
    //         hre.ethers.utils.parseEther("5.04", "ether"),
    //         hre.ethers.utils.parseEther("4.88", "ether"),
    //         hre.ethers.utils.parseEther("4.54", "ether"),
    //         hre.ethers.utils.parseEther("4.48", "ether"),
    //         hre.ethers.utils.parseEther("4.48", "ether"),
    //         hre.ethers.utils.parseEther("4.45", "ether"),
    //         hre.ethers.utils.parseEther("4.45", "ether"),
    //         hre.ethers.utils.parseEther("4.45", "ether"),
    //         hre.ethers.utils.parseEther("4.45", "ether"),
    //         hre.ethers.utils.parseEther("4.45", "ether"),
    //         hre.ethers.utils.parseEther("4.45", "ether"),
    //         hre.ethers.utils.parseEther("4.45", "ether"),
    //         hre.ethers.utils.parseEther("4.45", "ether"),
    //         hre.ethers.utils.parseEther("4.45", "ether"),
    //         hre.ethers.utils.parseEther("4.45", "ether"),
    //         hre.ethers.utils.parseEther("4.44", "ether"),
    //         hre.ethers.utils.parseEther("3.56", "ether"),
    //         hre.ethers.utils.parseEther("3.50", "ether"),
    //         hre.ethers.utils.parseEther("3.29", "ether"),
    //         hre.ethers.utils.parseEther("3.27", "ether"),
    //         hre.ethers.utils.parseEther("2.90", "ether"),
    //         hre.ethers.utils.parseEther("2.37", "ether"),
    //         hre.ethers.utils.parseEther("1.56", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.48", "ether"),
    //         hre.ethers.utils.parseEther("1.47", "ether"),
    //         hre.ethers.utils.parseEther("1.44", "ether"),
    //         hre.ethers.utils.parseEther("1.27", "ether"),
    //         hre.ethers.utils.parseEther("1.19", "ether"),
    //         hre.ethers.utils.parseEther("1.16", "ether"),
    //         hre.ethers.utils.parseEther("1.10", "ether"),
    //         hre.ethers.utils.parseEther("1.04", "ether"),
    //         hre.ethers.utils.parseEther("1.01", "ether"),
    //         hre.ethers.utils.parseEther("1.01", "ether"),
    //         hre.ethers.utils.parseEther("1.01", "ether"),
    //         hre.ethers.utils.parseEther("0.97", "ether"),
    //         hre.ethers.utils.parseEther("0.91", "ether"),
    //         hre.ethers.utils.parseEther("0.89", "ether"),
    //         hre.ethers.utils.parseEther("0.86", "ether"),
    //         hre.ethers.utils.parseEther("0.83", "ether"),
    //         hre.ethers.utils.parseEther("0.77", "ether"),
    //         hre.ethers.utils.parseEther("0.71", "ether"),
    //         hre.ethers.utils.parseEther("0.68", "ether"),
    //         hre.ethers.utils.parseEther("0.59", "ether"),
    //         hre.ethers.utils.parseEther("0.59", "ether"),
    //         hre.ethers.utils.parseEther("0.59", "ether"),
    //         hre.ethers.utils.parseEther("0.57", "ether"),
    //         hre.ethers.utils.parseEther("0.53", "ether"),
    //         hre.ethers.utils.parseEther("0.45", "ether"),
    //         hre.ethers.utils.parseEther("0.40", "ether"),
    //         hre.ethers.utils.parseEther("0.40", "ether"),
    //         hre.ethers.utils.parseEther("0.39", "ether"),
    //         hre.ethers.utils.parseEther("0.38", "ether"),
    //         hre.ethers.utils.parseEther("0.36", "ether"),
    //         hre.ethers.utils.parseEther("0.33", "ether"),
    //         hre.ethers.utils.parseEther("0.30", "ether"),
    //         hre.ethers.utils.parseEther("0.30", "ether"),
    //         hre.ethers.utils.parseEther("0.30", "ether"),
    //         hre.ethers.utils.parseEther("0.30", "ether"),
    //         hre.ethers.utils.parseEther("0.30", "ether"),
    //         hre.ethers.utils.parseEther("0.30", "ether"),
    //         hre.ethers.utils.parseEther("0.30", "ether"),
    //         hre.ethers.utils.parseEther("0.30", "ether"),
    //         hre.ethers.utils.parseEther("0.30", "ether"),
    //         hre.ethers.utils.parseEther("0.30", "ether"),
    //         hre.ethers.utils.parseEther("0.30", "ether"),
    //         hre.ethers.utils.parseEther("0.30", "ether"),
    //         hre.ethers.utils.parseEther("0.23", "ether"),
    //         hre.ethers.utils.parseEther("0.23", "ether"),
    //         hre.ethers.utils.parseEther("0.18", "ether"),
    //         hre.ethers.utils.parseEther("0.16", "ether"),
    //         hre.ethers.utils.parseEther("0.15", "ether"),
    //         hre.ethers.utils.parseEther("0.14", "ether"),
    //         hre.ethers.utils.parseEther("0.14", "ether"),
    //         hre.ethers.utils.parseEther("0.13", "ether"),
    //         hre.ethers.utils.parseEther("0.10", "ether"),
    //         hre.ethers.utils.parseEther("0.09", "ether"),
    //         hre.ethers.utils.parseEther("0.06", "ether"),
    //         hre.ethers.utils.parseEther("0.06", "ether"),
    //         hre.ethers.utils.parseEther("0.04", "ether"),
    //         hre.ethers.utils.parseEther("0.04", "ether"),
    //         hre.ethers.utils.parseEther("0.02", "ether"),
    //         hre.ethers.utils.parseEther("0.02", "ether")
    //     ]
    // )

    // await this.Reward.setLPvalue(
    //     ["0x343e53D0d06FBF692336CcF871d4c89aD8B706Be",
    //         "0x50545ca828447df7cda4a22f1650a002fbad72a2",
    //         "0xa455adc9f1246ae09518650b1f2f2a4fc102850b",
    //         "0xa0f6c22ebd04e2be0c142f7b867f6fc2779ce824",
    //         "0xabd0bd3810b9b0afee459abc192ab1dfd7eae035",
    //         "0x0b3bcd9a681c60a49de3a3967f6bb5d09614af13",
    //         "0x22c67d6af140266938200955fcdad3fb67ccf026",
    //         "0xa3a08280d9c7960fc73dfe5bbde70ea6c4ff513e",
    //         "0x1b959e9e89123e4409d170da0aecf70496f9935b",
    //         "0xcf1c7b4b3390639d60923f64a4b5ed1cbdfc0594",
    //         "0x98260900a91782561d06fb2e2e614f72027d4502",
    //         "0xd51fe69a363e62ad8a6fe0d37066c29e1be9c7e8",
    //         "0xd2d294aeaa615568643bc20fe540f21aa7df5e72",
    //         "0x0f551c944367db5604c7c98722024c22bfa78441",
    //         "0xb68dbc514a7e024b880114fca8473ed7e2b28828"
    //     ],
    //     [hre.ethers.utils.parseEther("4030.29", "ether"),
    //         hre.ethers.utils.parseEther("65.77", "ether"),
    //         hre.ethers.utils.parseEther("16.87", "ether"),
    //         hre.ethers.utils.parseEther("8.74", "ether"),
    //         hre.ethers.utils.parseEther("8.32", "ether"),
    //         hre.ethers.utils.parseEther("7.84", "ether"),
    //         hre.ethers.utils.parseEther("5.47", "ether"),
    //         hre.ethers.utils.parseEther("1.62", "ether"),
    //         hre.ethers.utils.parseEbther("1.62", "ether"),
    //         hre.ethers.utils.parseEther("1.45", "ether"),
    //         hre.ethers.utils.parseEther("1.44", "ether"),
    //         hre.ethers.utils.parseEther("1.34", "ether"),
    //         hre.ethers.utils.parseEther("0.75", "ether"),
    //         hre.ethers.utils.parseEther("0.66", "ether"),
    //         hre.ethers.utils.parseEther("0.31", "ether")
    //     ]

    // )

    await this.Reward.setTimeline(parseInt((new Date().getTime()) / 1000))


    console.log("End")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
