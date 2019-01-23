#!/usr/bin/env bash

sequelize model:create --name Representative --attributes "firstName:string, lastName:string, email:string, dateOfBirth:date, contact:string"

sequelize model:create --name User --attributes "username:string, password:string"

sequelize model:create --name Constituency  --attributes "constituencyName:string"

sequelize model:create --name SubCounty --attributes "subCountyName:string"

sequelize model:create --name Parish --attributes "parishName:string"

sequelize model:create --name Village --attributes "villageName:string"

