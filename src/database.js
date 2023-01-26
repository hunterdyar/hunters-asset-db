import React, {useEffect} from "react";

//@ts-check
const CosmosClient = require('@azure/cosmos').CosmosClient

const config = require('./config')

const endpoint = config.endpoint
const key = config.key

const databaseId = config.database.id
const containerId = config.container.id

const options = {
    endpoint: endpoint,
    key: key,
    userAgentSuffix: 'CosmosDBJavascriptQuickstart'
};

const client = new CosmosClient(options)

/**
 * Read the database definition
 */
async function readDatabase() {
    const { resource: databaseDefinition } = await client
        .database(databaseId)
        .read()
    console.log(`Reading database:\n${databaseDefinition.id}\n`)
}


/**
 * Read the container definition
 */
async function readContainer() {
    const { resource: containerDefinition } = await client
        .database(databaseId)
        .container(containerId)
        .read()
    console.log(`Reading container:\n${containerDefinition.id}\n`)
}


async function find(querySpec) {
    if (!this.container) {
        throw new Error('Collection is not initialized.')
    }
    const { resources } = await this.container.items.query(querySpec).fetchAll()
    return resources
}

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
        console.Log("Error");
    }
}

async function getAllAssets(){
    const querySpec = {
        query: 'SELECT * FROM c',

            }

    const { resources: results } = await client
        .database(databaseId)
        .container(containerId)
        .items.query(querySpec)
        .fetchAll();
    return results;
}

/**
 * Exit the app with a prompt
 * @param {string} message - The message to display
 */
function exit(message) {
    console.log(message)
    console.log('Press any key to exit')
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.on('data', process.exit.bind(process, 0))
}

//Hooks
export function GetAssetHook(rid)
{
    const [id, setID] = React.useState(rid);
    const [asset, setAsset] = React.useState({});
    React.useEffect(() => {
        queryContainer(id).then(response => {
            setAsset(response);
        })
    },[id]);

    return [id,setID,asset];
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
