import Router, {Response, Request} from 'express';

const router = Router()
const port = 6769

router.post('/login', (req: Request, res: Response) => {
    res.status(200).end("test");
});

router.post('/join', (req: Request, res: Response) => {

});

router.post('/action', (req: Request, res: Response) => {
    
});

router.get('/:gameId/gamestate', (req: Request, res: Response) => {
    
});

router.get('/playerStats/:playerId', (req: Request, res: Response) => {
    
});

router.get('/playerStats', (req: Request, res: Response) => {
    
});

router.post('/create', (req: Request, res: Response) => {
    
});