import ProductEditorContent from "../../../../components/ProductEditorContent";

function userEditPage(props) {

    return (
      <ProductEditorContent productId={props.product}/>
    )
}

export function getStaticProps(context) {
    const { params } = context;
    const { product_id } = JSON.parse(JSON.stringify(params));

    // checkCacheData(symbol)
    // getStockData(symbol)
    //   const stockData = {
    //     symbol: symbol,
    //     value: 178,
    //     change: "+12%",
    //   };

    return {
        props: {
            product: product_id,
        },
        // fetching for a single post every 500 mins
        revalidate: 300000,
    };
}

export function getStaticPaths() {
    // const popularStocks = getPopularStocks();

    return {
        // add the popular stocks here
        // paths: popularStocks.map((stock) => ({params:  {stock: stock}})),
        paths: [],
        // have to create a loading screen for fallback
        // fallback: true
        fallback: "blocking",
    };
}

export default userEditPage;
