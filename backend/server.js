const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const knex = require('knex');

const app = express();
const port = 5000;

const dbConfig = {
    host: 'sthub.c3uguk04fjqb.ap-southeast-2.rds.amazonaws.com',
    user: 'stpostgres',
    password: 'stocktrader',
    database: 'postgres'
};

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}));
app.use(bodyParser.json());
app.use(morgan('combined'));

const db = knex({
    client: 'pg',
    connection: dbConfig
});

app.get('/api/data', async (req, res) => {
    try {
        const query = `
            SELECT 
                p.performance_id,
                p.unit_assignment_id,
                p.profit_and_loss,
                p.battle_date,
                p.lead_id,
                p.percentageprofitandloss,
                d.start_date,
                d.end_date,
                d.status,
                l.stock_name,
                f.ticker,
                f.sector
            FROM 
                war.performance p
            LEFT JOIN 
                war.deployment d ON p.unit_assignment_id = d.unit_assignment_id
            LEFT JOIN 
                war.allocation a ON d.deployment_id = a.deployment_id
            LEFT JOIN 
                war.leads l ON p.lead_id = l.leads_id
            LEFT JOIN 
                stocktrader.fortune_1000 f ON l.stock_name = f.ticker
        `;

        const data = await db.raw(query);

        const formattedData = data.rows.map(row => ({
            performance_id: row.performance_id,
            unit_assignment_id: row.unit_assignment_id,
            profit_and_loss: row.profit_and_loss,
            battle_date: row.battle_date,
            lead_id: row.lead_id,
            percentageprofitandloss: row.percentageprofitandloss,
            start_date: row.start_date,
            end_date: row.end_date,
            status: row.status,
            quadrant: row.lead_id,
            stock_name: row.stock_name,
            ticker: row.ticker,
            sector: row.sector,
            color: row.profit_and_loss >= 0 ? 'green' : 'red'
        }));

        console.log('Formatted Data:', formattedData);

        res.json(formattedData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
