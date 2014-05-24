///<reference path='references.d.ts' />

interface IMandrillCredentials {
	key:string;
}

interface IEmail {
	subject:string;
	from:string;
	to:IContact[];
	message:string;

	link?:string;
	signature?:string;
}

interface IContact {
	email:string;

	name?:string;
}


interface ISendEmailRequest {

}