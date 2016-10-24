/*
TODO:
better input system to allow for sentences to be inputted as a parameter (kind of fixed but not really)
role management?
*/

var Discord = require("discord.js");
var fs = require('fs');
var bot = new Discord.Client();

bot.loginWithToken("", function(error, token) {
	if (error) {
		console.log("error logging in with token: " + token);
	}
	else {
		console.log("successfully logged in with token: " + token);
	}
});

bot.on("message", function(message) {
	if (message.author != bot.user) {
		var cmdText = message.content.split(" ");
		var param = "";
		var param2 = "";
		var param3 = "";

		if (cmdText.length > 1) {
			param = cmdText[1].toLowerCase();

			if (cmdText.length > 2) {
				param2 = cmdText[2].toLowerCase();

				if (cmdText.length > 3) {
					param3 = cmdText[3].toLowerCase();
				}
			}
		}

		var tags = message.content.split('"');

		if (message.content.startsWith("!battlestations")) {
			if (message.author.game == null) {
  				message.server.members.map(u => bot.sendMessage(u, message.author.username + "(playing nothing) has called everybody to battlestations with the message: " + param));
  			}
  			else {
  				message.server.members.map(u => bot.sendMessage(u, message.author.username + " (playing: " + message.author.game.name + ") has called everybody to battlestations with the message: " + param));
  			}
		}

		if (message.content.indexOf("kenny") >= 0) {
			bot.sendMessage(message.channel, ":middle_finger:");
		}

		if (message.content.startsWith("!defib")) {
			bot.reply(message, "bot is alive");
		}

		if (message.content.startsWith("!allahu")) {
			bot.reply(message, "Akbar");
		}

		if (message.content.startsWith("!filthy")){
			bot.reply(message, "https://www.youtube.com/watch?v=2dbR2JZmlWo");
		}

		if (message.content.startsWith("!weather")) {
			bot.reply(message, "https://www.wunderground.com/cgi-bin/findweather/getForecast?query=" + param);
		}

		if (message.content.startsWith("!watchit")) {
			bot.reply(message, "https://www.watch2gether.com/go#" + param);
		}

		if (message.content.startsWith("!undercover")) {
			if (param2.length > 0 && param.length > 0) {
				var target;

				message.server.members.forEach((member, index, array) => {
					if (member.username === tags[1]?tags[1]:"") {
						target = member;
					}
				});

				if (target != null) {
					bot.setNickname(message.server, param, target, function(error) {
						if (error) {
							bot.sendMessage(message.channel, "Could not change nickname, try checking permissions");
						}
						else {
							bot.sendMessage(message.channel, "Nickname change successful!");
						}
					});
				}
				else {
					bot.sendMessage(message.channel, "error! There is nobody named: " + param2);
				}
			}
			else {
				bot.setNickname(message.server, param, message.author, function(error) {
					if (error) {
						bot.sendMessage(message.channel, "Could not change nickname, try checking permissions");
					}
					else {
						bot.sendMessage(message.channel, "Nickname change successful!");
					}
				});
			}
		}

		if (message.content.startsWith("!join-server")) {
			if (message.author.id != 213423907993157633) {
				bot.reply(message, "You're not my creator and therefore cannot make me join servers");
				console.log("Attempt from " + message.author.username + "(id: " + message.author.id + ") trying to change my server");
			}
			else {
				console.log(bot.joinServer(param, function(error, server) {
					if (error) {
						bot.sendMessage(message.channel, "Failed to join: " + error);
					}
					else {
						console.log("Server join successful (joined: " + server + ")");
						bot.sendMessage(message.channel, "Joined server " + server);
					}
				}));
			}
		}

		if (message.content.startsWith("!leave-server")) {
			if (message.author.id != 213423907993157633) {
				bot.reply(message, "You're not my creator and therefore cannot make me leave servers");
				console.log("Attempt from " + message.author.username + "(id: " + message.author.id + ") trying to change my server");
			}
			else {
				console.log(bot.leaveServer(message.server, function(error, server) {
					if (error) {
						console.log("Failed to leave server " + message.server);
						bot.sendMessage(message.channel, "Failed to leave: " + error);
					}
					else {
						console.log("Server leave successful (left: " + server.name + ")");
					}
				}));
			}
		}

		if (message.content.startsWith("!console-log")) {
			console.log(param);
		}

		if (message.content.startsWith("!logout")) {
			if (message.author.id != 213423907993157633) {
				bot.reply(message, "You're not my creator and therefore cannot log me out");
			}
			else {
				bot.logout(function(error) {
					if (error) {
						bot.sendMessage(message.channel, "Could not log out: " + error);
					}
				});
			}
		}

		if (message.content.startsWith("!invite")) {
			var options = {
				maxAge: 3600,
				maxUses: 20,
				temporary: true,
				xkcd: true
			}

			bot.createInvite(message.server, options, function(error, invite) {
				if (error) {
					bot.reply(message, "could not create invite with error: " + error);
				}
				else {
					bot.reply(message, "invite created! (" + invite + ")");
				}
			});
		}

		if (message.content.startsWith("!insult")) {
			var insults = ["You must've been born on a highway becasue that's where most accidents happen", "Squidward's nose is a metaphor for your life", "you are a failed abortion and your birth certificate is an apology from the condom factory.", "your penis must be the size of Mr. Krabs' world's smallest violin", "you're ugly", "I hope that one day you get captured by terrorists, raped, get your toenails ripped off with pliers, and waterboarded all in the span of 10 minutes.", "I hope you put fresh socks on and then step in a puddle", "I hope you put on your shoes and you feel a pebble.", "I hope you bite into a burrito and the sour cream is all in one end.", "one day you're gonna wake up and realize that you are worth nothing. Nothing you do in life will be worthwhile you fat fuck. Every single thing that you do will be forgotten because you suck. The only thing that you might be remembered for is how badly you suck. You are just a sack of human feces.", ]
			var person = Math.floor(Math.random() * message.server.members.length);
			var insult = Math.floor(Math.random() * insults.length);

			if (message.server.members[person].id === "213727871762432005") {
				return;
			}

			bot.sendMessage(message.channel, message.server.members[person].username + ", " + insults[insult]);
		}

		if (message.content.startsWith("!channel-log")) {
			var options = { before: message };

			bot.getChannelLogs(message.channel, param, options, function(error, messages) {
				file_log("logs/channel-logs.txt", " ");

				if (error) {
					console.log("Could not get logs with error " + error);
					bot.sendMessage("Could not get logs with error " + error);
					file_aslog(error);
				}
				else {
					messages.map(u => file_aslog(u.content + "|"));
					bot.sendMessage(message.channel, "Successfully wrote logs to file");
				}
			});
		}

		if (message.content.startsWith("!create-channel")) {
			bot.createChannel(message.server, param, param2, function(error, channel) {
				if (error) {
					bot.sendMessage(message.channel, "Could not create channel");
				}
				else {
					bot.sendMessage(message.channel, "Successfully created channel: " + channel.name);
				}
			});
		}

		if (message.content.startsWith("!delete-channel")) {
			bot.deleteChannel(param, function(error) {
				if (error) {
					bot.sendMessage(message.channel, "Could not delete channel (id: " + param + ")");
				}
				else {
					bot.sendMessage(message.channel, "Successfully deleted channel with the id of " + param);
				}
			});
		}

		if (message.content.startsWith("!channel-topic")) {
			bot.setChannelTopic(param, tags[1]?tags[1]:"", function(error) {
				if (error) {
					bot.sendMessage(message.channel, "Unable to change channel topic with error " + error);
					file_aslog(error);
				}
				else {
					bot.sendMessage(message.channel, "Successfully set topic of channel");
				}
			})
		}

		if (message.content.startsWith("!channel-name")) {
			bot.setChannelName(param, tags[1]?tags[1]:"", function(error) {
				if (error) {
					bot.sendMessage(message.channel, "Unable to rename channel with error " + error);
					file_aslog(error);
				}
				else {
					bot.sendMessage(message.channel, "Successfully renamed channel");
				}
			});
		}

		if (message.content.startsWith("!flush-logs")) {
			if (message.author.id == 213423907993157633) {
				file_log("logs/log.txt", " ");
				bot.sendMessage(message.channel, "Logs flushed");
			}
			else {
				bot.reply(message, "only my creator can do that!");
			}
		}

		if (message.content.startsWith("!who")) {
			var target = message.server.members.get("id", param);

			if (target != null) {
				if (!target.bot) {
					bot.reply(message, target.username + "(" + target.id + ")" + " is NOT a bot and was created on (" + target.createdAt + ")");
				}
				else {
					bot.reply(message, target.username + "(" + target.id + ")" + " IS a bot and was created on (" + target.createdAt + ")");
				}
			}
			else {
				bot.reply(message, param + " is not the id of any user in the server!");
			}
		}

		if (message.content.startsWith("!help")) {
			bot.reply(message, `it is me discbot cyka blyat arigato por favor
				Current commands:
				!defib
				!allahu
				!filthy
				!weather {zipcode} - sends a link to wunderground.com
				!watchit - creates a watch2gether 
				!undercover {new name, (optional) target} - changes your nickname
				!battlestations {message} - privately pm's everybody in the server with your message because who needs actual functionality
				!alert
				!insult
				!invite - creates an invite with 20 uses available for 60 minutes
				!help
				`);
		}
	}
	else {
		return;
	}
});

function file_alog(buffer, path) {
	fs.appendFile(path, buffer + "\n", function(error) {
		if (error) {
			return console.log("Could not log to file: " + path);
		}
		else {
			return console.log("Successfully logged buffer to file " + path);
		}
	});
}

function file_aslog(buffer) {
	fs.appendFile("logs/log.txt", buffer + "\n", function(error) {
		if (error) {
			return console.log("Could not log to file: " + path);
		}
		else {
			return console.log("Successfully logged buffer to file " + "logs/log.txt");
		}
	});
}

function file_log(path, buffer) {
	fs.writeFile(path, buffer + "\n", function(error) {
		if (error) {
			return console.log("Could not write to file" + path);
		}
		else {
			return console.log("Successfully wrote to file " + path);
		}
	});
}
