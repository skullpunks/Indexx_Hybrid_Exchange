export default function ToText(node) {
    let tag = document.createElement("div");
    tag.innerHTML = node;
    node = tag.innerText;
    return node;
}

/*
 {
    "title": "INEX-POLYGON",
    "subTitle": "IndexxExchange",
    "image": "INEX",
    "address": "0x129d9E5a74C2dD427b5C326406039976FE963a90",
    "commonToken": true,
    "isStock": false,
    "graph": "IndexxExchangePolygon",
    "stakingPercentage6months": 6,
    "stakingPercentage1year": 15,
    "chain": "Polygon"
  },
  {
    "title": "INEX-ETHEREUM",
    "subTitle": "IndexxExchange",
    "image": "INEX",
    "address": "0x129d9E5a74C2dD427b5C326406039976FE963a90",
    "commonToken": true,
    "isStock": false,
    "graph": "IndexxExchangePolygon",
    "stakingPercentage6months": 6,
    "stakingPercentage1year": 15,
    "chain": "Ethereum"
  },
*/