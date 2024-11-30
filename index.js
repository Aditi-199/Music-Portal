const express=require("express");
const fs=require("fs");
const app=express();
const path=require("path");

app.get("/",(req,res)=>
{
    let html="<html><body>";
    for(let i=65;i<=90;i++)
    {
        html=html+`<a href='movies?mname=${String.fromCharCode(i)}'>${(String.fromCharCode(i))}</a>&nbsp;&nbsp;&nbsp`;

    }
html=html+"</body></html>"
res.send(html);
});

app.get("/movies",(req,res)=>
{
    let dirs=fs.readdirSync("MySongs");
    let html="<html><body>";
    for(let d of dirs)
    {
        if(d.startsWith(req.query.mname))
        html=html+`<a href='Songs?mname=${d}'>${d}</a><br>`;

    }
html=html+"</body></html>"
res.send(html);
});
app.get("/Songs",(req,res)=>
    {
        let m=req.query.mname;
        let dirs=fs.readdirSync(`MySongs/${m}`);
        let html="<html><body>";
        for(let d of dirs)
        {
            html=html+`<a href='play?mname=${m}&sname=${d}'>${d}</a><br>`;
    
        }
    html=html+"</body></html>"
    res.send(html);
    });
    app.get("/play",(req,res)=>
        {
            let mname=req.query.mname;
            let sname=req.query.sname;
            let loc=path.join(__dirname,"MySongs",`${mname}/${sname}`);
            console.log(loc);
            res.sendFile(loc);
        });
app.listen(8000);