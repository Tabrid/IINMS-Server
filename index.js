import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/db.js';
import roleRoutes from "./routes/roleRoutes.js";
import blockRoutes from "./routes/blockRoutes.js";
import upazilaRoutes from "./routes/upazilaRoutes.js";
import districtRoutes from "./routes/districtRoutes.js";
import divisionRoutes from "./routes/divisionRoutes.js";
import regionRoutes from "./routes/regionRoutes.js";
import weatherParameterRoutes from "./routes/weatherParameterRoutes.js";
import hotspotRoutes from "./routes/hotspotRoutes.js";
import aezRoutes from "./routes/aezRoutes.js";
import csaRoutes from "./routes/csaRoutes.js";
import farmerRoutes from "./routes/registedUserRoutes.js";
import saaOFormRoutes from "./routes/saaOFormRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', 
 }));
 
// Routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use("/api/bloks", blockRoutes);
app.use("/api/upazila", upazilaRoutes);
app.use("/api/district", districtRoutes);
app.use("/api/division", divisionRoutes);
app.use("/api/region", regionRoutes);
app.use("/api/weather-parameters", weatherParameterRoutes);
app.use("/api/hotspots", hotspotRoutes);
app.use("/api/aezs", aezRoutes);
app.use("/api/csas", csaRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/saaOForms", saaOFormRoutes);
app.use("/api/feedback", feedbackRoutes);
// Start server and sync database
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => console.error('Error syncing database:', err));
