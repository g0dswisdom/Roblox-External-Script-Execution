import express from 'express'
import { get_scripts, get_latest_script, add_script } from './controllers/scriptExecution';
import { exec } from 'child_process'

const app = express();
app.use(express.json());

app.get('/scripts', get_scripts);
app.get('/latest', get_latest_script)
app.post('/scripts', add_script);

app.listen(3000, () => {
    console.log('[+] ready!');
})

exec('py gui.py', (err, stdout, stderr) => {
    
})