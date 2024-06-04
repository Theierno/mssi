import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function App({ candidate }) {
  return (
    <Card className="max-w-[800px]" >
      <CardHeader className="flex gap-3" >
        <Image
          alt="nextui logo"
          height={100}
          radius="sm"
          src={candidate.url_image}
          width={100}
        />
        <div className="flex flex-col">
          <p className="text-lg" style={{fontWeight : 'bolder', fontSize : 29, marginLeft: 30, marginBottom: 10}}>{candidate.first_name} {candidate.last_name}</p>
          <p className="text-small text-default-500" style={{color: 'gray', fontSize : 19, marginLeft: 30}}>{candidate.function}</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody style={{ flexDirection : 'column', alignItems: 'flex-start'}}>
      <h2 style={{ fontWeight : 'bolder', fontSize: 25, marginBottom: 10}}>Biographie</h2>
        <p>{candidate.biography}</p>
      </CardBody>
      <Divider/>
      
      <CardFooter style={{ flexDirection : 'column', alignItems: 'flex-start'}}>
        <h4 style={{ fontWeight : 'bolder'}}>Programme</h4>
        <p> {candidate.program}</p>
      </CardFooter>
    </Card>
  );
}
