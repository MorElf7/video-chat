import { Router } from "express";
import authRoutes from "./auth.routes";
import chatRoutes from "./chat.routes";
import notificationRoutes from "./notification.routes";
import roomRoutes from "./room.routes";
import userRoutes from "./user.routes";

export default () => {
	const app = Router();
	authRoutes(app);
	roomRoutes(app);
	userRoutes(app);
	chatRoutes(app);
	notificationRoutes(app);
	return app;
};
