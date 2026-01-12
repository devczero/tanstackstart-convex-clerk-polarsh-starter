import { httpRouter } from "convex/server";
import { polar } from "./subscriptions"; // wherever your polar client is exported

const http = httpRouter();

// This registers POST /polar/events
polar.registerRoutes(http);

export default http;