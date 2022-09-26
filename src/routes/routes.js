import config from '~/config/config';

// 
import MovieTypeLayout from '~/layouts/MovieTypeLayout/MovieTypeLayout';
import DetailsLayout from '~/layouts/DetailsLayout/DetailsLayout';
import RegisterLayout from '~/layouts/RegisterLayout/RegisterLayout';
import LogInLayout from '~/layouts/LogInLayout/LogInLayout';

//
import Home from '~/pages/Home/index.js';
import MoviesType from '~/pages/MoviesType/index.js';
import Details from '~/pages/Details/index.js';
import Register from '~/pages/Register';
import LogIn from '~/pages/LogIn/LogIn';
import Private from '~/pages/Private/Private';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.details, component: Details, layout: DetailsLayout},
    { path: config.routes.type, component: MoviesType, layout: MovieTypeLayout},
    { path: config.routes.register, component: Register, layout: RegisterLayout},
    { path: config.routes.login, component: LogIn, layout: LogInLayout},
]
const privateRoutes = [
    { path: config.routes.private, component: Private }
];

export { publicRoutes, privateRoutes };