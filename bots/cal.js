const { Telegraf,Telegram,Markup } = require('telegraf')
//const fetch = require('node-fetch').default

const calElm = ['1','2','3','4','5','6','7','8','9','clr','+','-','/','*','.','='];
const calA =  ['clr','+','/','7','8','9','+','4','5','6','-','1','2','3','.','='];
const calB =  ['clr',' ',' ','7','8','9',' ','4','5','6',' ','1','2','3','.',' '];
let cal = '';
let acal = calB;

function calArray(str){
	if(!isNaN(str)){
		return calA;
	}
	return calB;
}
function calcul(ctx){
					if(ctx.match[0]==='clr'){
						cal = '';
					}else
					if (ctx.match[0]==='=') {
						cal = eval(cal.replaceAll('x','*'));
					}else 
					if (ctx.match[0]==='*') {
						cal = cal+'x';
					}else
						cal += ctx.match[0];
					return cal.toString();
}

module.exports = function(BOT_TOKEN){
		const bot = new Telegraf(BOT_TOKEN);
		//const edit = new Telegram(BOT_TOKEN);
		
		bot.use(Telegraf.log())			
			bot.command('cal', (ctx) => {
			  return ctx.reply(`<i>Kalkulyatr                                .:\n</i>`, {
			    parse_mode: 'HTML',
			    ...Markup.inlineKeyboard([
			    [	
			    	Markup.button.callback('clr', 'clr'),
			    	Markup.button.callback('/', '/'),
			      	Markup.button.callback('*', '*')
			    ],[
			    	Markup.button.callback('7', '7'),
			      	Markup.button.callback('8', '8'),
			      	Markup.button.callback('9', '9'),
			      	Markup.button.callback('+', '+')
			    ],[	
			    	Markup.button.callback('4', '4'),
			      	Markup.button.callback('5', '5'),
			      	Markup.button.callback('6', '6'),
			      	Markup.button.callback('-', '-')
			    ],[
			      	Markup.button.callback('1', '1'),
			      	Markup.button.callback('2', '2'),
			      	Markup.button.callback('3', '3'),
			      	Markup.button.callback('.', '.')
			    ],[
			    	Markup.button.callback('=', '=')
			    ]])
			  })
			})

			bot.action(calElm,  async (ctx) =>{
				    acal = calArray(ctx.match[0]);
					cal = calcul(ctx);
					console.log(cal,acal);
				  	await ctx.answerCbQuery()

	              	await ctx.editMessageText('Kalkulyatr                                  .:\n'+cal, {
	                	parse_mode: 'Markdown',
	                	 ...Markup.inlineKeyboard([
						    [	
						    	Markup.button.callback('clr', acal[0]),
						    	Markup.button.callback('/', acal[1]),
						      	Markup.button.callback('*', acal[2])
						    ],[
						    	Markup.button.callback('7', acal[3]),
						      	Markup.button.callback('8', acal[4]),
						      	Markup.button.callback('9', acal[5]),
						      	Markup.button.callback('+', acal[6])
						    ],[	
						    	Markup.button.callback('4', acal[7]),
						      	Markup.button.callback('5', acal[8]),
						      	Markup.button.callback('6', acal[9]),
						      	Markup.button.callback('-', acal[10])
						    ],[
						      	Markup.button.callback('1', acal[11]),
						      	Markup.button.callback('2', acal[12]),
						      	Markup.button.callback('3', acal[13]),
						      	Markup.button.callback('.', acal[14])
						    ],[
						    	Markup.button.callback('=', acal[15])
						    ]])
	              	})
			})
	
			bot.launch()

			// Enable graceful stop
			process.once('SIGINT', () => bot.stop('SIGINT'))
			process.once('SIGTERM', () => bot.stop('SIGTERM'))
}