import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import { ulid } from 'ulid';

// TODO: create website for this with a cool script hub.. maybe?

type script = {
    hash: string,
    script: string
}

let scripts: script[] = []; // not saving all scripts, so when this thing is restarted the array gets reset

export const get_scripts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.json(scripts);
})

export const get_latest_script = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (scripts.length >= 1) {
        let latestScript = scripts.length - 1;

        res.json({
            'latestScript': scripts[latestScript]
        })
    } else {
        res.json({
            'latestScript': 'none'
        })
    }
})

export const add_script = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let scriptContent = req.body.script;
    let hash = ulid();

    while (scripts.some((scr) => scr.hash === hash)) {
        hash = ulid(); // making sure there arent any scripts with the same hash
    } 
    scripts.push({'script': scriptContent, 'hash': hash})
})