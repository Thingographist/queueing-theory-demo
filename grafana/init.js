const fs = require('fs');

const axios = require('axios');

async function sendRequest(method, path, data) {
    await axios({
        method: method,
        url: `http://admin:admin@localhost:3007${path}`,
        headers: {
            'Content-Type': 'application/json',
            "X-Disable-Provenance": true
        },
        data: data
    });
}

(async () => {
    await sendRequest('POST', '/api/datasources', fs.readFileSync('./grafana/datasources.json', 'utf8'));
    console.log('Загрузили источники данных');
    

    await sendRequest('POST', '/api/dashboards/db', fs.readFileSync('./grafana/dashboards.json', 'utf8'));
    console.log('Загрузили дашборды');

    await sendRequest('PUT', '/api/v1/provisioning/templates/kakfa-data-alerts', fs.readFileSync('./grafana/templates.json', 'utf8'));
    console.log('Загрузили темплейты оповещений');
    
    await sendRequest('POST', '/api/v1/provisioning/contact-points', fs.readFileSync('./grafana/contact_points.json', 'utf8'));
    console.log('Загрузили настройки для целей оповещений');
    
    await sendRequest('PUT', '/api/v1/provisioning/policies', fs.readFileSync('./grafana/policies.json', 'utf8'));
    console.log('Загрузили настройки политики оповещений');

    await sendRequest('POST', '/api/folders', fs.readFileSync('./grafana/alert_folder.json', 'utf8'));
    await sendRequest('PUT', '/api/v1/provisioning/folder/be2gjg9d9cb28f/rule-groups/fast%20alerts', fs.readFileSync('./grafana/alerts_group.json', 'utf8'));
    console.log('Загрузили группы оповещений');

    // return

    await sendRequest('POST', '/api/v1/provisioning/alert-rules', fs.readFileSync('./grafana/alerts.json', 'utf8'));
    console.log('Загрузили настройки оповещений');
})().catch(e => { throw (e); });
