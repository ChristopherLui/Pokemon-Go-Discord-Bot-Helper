import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import { commands } from './commands.js';

dotenv.config()



const rest = new REST({ version: '10' });
rest.setToken(process.env.DISCORD_TOKEN);


(async () => {
  try {
    console.log('Registering guild (local) commands...');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('Guild commands registered instantly');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
})();