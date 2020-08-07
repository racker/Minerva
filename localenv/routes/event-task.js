import express from "express";
import axious from "axios";
import settings from "../config/index";
import identity from '../server/identity/token';

var router = express.Router();
var config= new settings();

router.post('',(req, res) =>{
    let event= req.body;
    axious.post(`${config.monitoring.api_host}`,
    {headers:{'x-auth-token': identity.info().token.id}}
    )
})

