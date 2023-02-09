import React, {useEffect} from "react";

//@ts-check
const CosmosClient = require('@azure/cosmos').CosmosClient

const config = require('./config')

const endpoint = process.env.REACT_APP_ENDPOINT
const key = process.env.REACT_APP_KEY

const databaseId = config.database.id
const containerId = config.container.id

const options = {
    endpoint: endpoint,
    key: key,
    userAgentSuffix: 'CosmosDBJavascriptQuickstart'
};

const client = new CosmosClient(options)



/**
 * Query the container using SQL
 */
async function queryContainer(id) {
    // query to return all children in a family
    // Including the partition key value of country in the WHERE filter results in a more efficient query
    const querySpec = {
        query: 'SELECT * FROM r WHERE r.id = @id',
        parameters: [
            {
                name: '@id',
                value: id
            }
        ]
    }

    const { resources: results } = await client
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll();
    if(results.length === 1){
        return results[0];
    }else{
        console.log("Error");
    }
}

async function getAllAssets(){
    const querySpec = {
        query: 'SELECT * FROM c ORDER BY c._ts DESC'
            }

    const { resources: results } = await client
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll();
    return results;
}


//Hooks
export function GetAssetHook(rid)
{
    const [id] = React.useState(rid);
    const [asset, setAsset] = React.useState({});
    React.useEffect(() => {
        queryContainer(id).then(response => {
            setAsset(response);
        })
    },[id]);

    return [id,asset];
}

export function GetAllAssetsHook()
{
    const [assets, setAssets] = React.useState([]);

    useEffect(() => {
        getAllAssets().then(response => {
            setAssets(response);
        });
    }, [])

    return [assets, setAssets];
}
