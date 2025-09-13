import dotenv from 'dotenv'
import fetch from 'node-fetch'


dotenv.config()

import { 
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    Events,
    Collection
} from 'discord.js';

const client = new Client ({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
});

client.commands = new Collection()

client.once('ready', () => {
    console.log(`Logged in as user ${client.user.tag}`);
});

async function getStats(pokemonName) {
    const res = await fetch('https://pogoapi.net/api/v1/pokemon_stats.json')
    const allStats = await res.json();

    const max = await fetch('https://pogoapi.net/api/v1/pokemon_max_cp.json')
    const maxCP = await max.json();

    const stats = Object.values(allStats).find(
        (a) => a.pokemon_name && a.pokemon_name.toLowerCase() === pokemonName.toLowerCase()
    );

    const CP = Object.values(maxCP).find(
        (a) => a.pokemon_name && a.pokemon_name.toLowerCase() === pokemonName.toLowerCase()
    );

    if (!stats || !CP) return null;

    return {
        ...stats,          // base_attack, base_defense, base_stamina, pokemon_id, pokemon_name
        max_cp: CP.max_cp, // max cp at level 50
       
    };
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    else if (interaction.commandName === 'dex') {
        const name = interaction.options.getString('pokemon');
        console.log('Pokemon queried:', name); 

        const data = await getStats(name)
        console.log('Data found:', data); 

        let embed
        

        if (!data) {
            embed = new EmbedBuilder()
                .setColor(0x3498DB)
                .setTitle('**Pokemon not found!**')
                .setDescription('Please try again!')
        }else {

            const shadow_attack = (data.base_attack * 1.2).toFixed(1)
            const shadow_defense = (data.base_defense * 0.8333).toFixed(1)
            embed = new EmbedBuilder()
                .setColor(0x3498DB)
                .setTitle(`**#${data.pokemon_id}. ${data.pokemon_name}**`)
                .setDescription(`**Base Stats**\n\nAttack: **${data.base_attack}**\n\nDefense: **${data.base_defense}**\n\nHealth Points: **${data.base_stamina}**\n\nMaximum Combat Power at level 50: **${data.max_cp}**\n\n
                    **Shadow Form Stats**\n\nAttack: **${shadow_attack}**\n\nDefense: **${shadow_defense}**`)
        }
        await interaction.reply({ embeds: [embed] });
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    let embed

    switch(interaction.commandName) {
        case 'user':
            await interaction.reply(
            `User ${interaction.user.username}, joined ${interaction.member.joinedAt}`
        )
        break
        case 'ping':
            await interaction.reply(
                'Pong!'
        )
        break
                
        case 'type':
            const pokemonType = interaction.options.getSubcommand()
            switch (pokemonType) {
                case 'water':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('🌊 **Water** 🌊')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Fire, Ground, Rock**\n\nNot very effective against: **Water, Grass, Electric, Dragon**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Fire, Water, Ice, Steel**\n\nTakes double damage from: **Grass, Electric**')
                break

                case 'fire':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('🔥 **Fire** 🔥')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Grass, Ice, Bug, Steel**\n\nNot very effective against: **Fire, Water, Rock, Dragon**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Fire, Grass, Ice, Bug, Steel, Fairy**\n\nTakes double damage from: **Ground, Water, Rock**')
                break

                case 'grass':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('🌿 **Grass** 🌿')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Ground, Water, Rock**\n\nNot very effective against: **Grass, Flying, Bug, Poison, Steel, Fire, Dragon**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Water, Electric, Grass, Ground**\n\nTakes double damage from: **Flying, Bug, Ice, Poison, Fire**')
                break

                case 'normal':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('⭕ **Normal** ⭕')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **None 🌚**\n\nNot very effective against: **Rock, Steel**\n\nHas no effect on: **Ghost**\n\n🛡️**Defensive Relationships**🛡️\n\nImmune to: **Ghost**\n\nTakes double damage from: **Fighting**')
                break

                case 'electric':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('⚡ **Electric** ⚡')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Water, Flying**\n\nNot very effective against: **Electric, Grass, Dragon**\n\nHas no effect on: **Ground**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Electric, Flying, Steel**\n\nTakes double damage from: **Ground**')
                break

                case 'ice':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('❄️ **Ice** ❄️')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Grass, Ground, Flying, Dragon**\n\nNot very effective against: **Fire, Water, Ice, Steel**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Ice**\n\nTakes double damage from: **Fire, Fighting, Rock, Steel**')
                break

                case 'fighting':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('🥊 **Fighting** 🥊')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Normal, Ice, Rock, Dark, Steel**\n\nNot very effective against: **Poison, Flying, Psychic, Bug, Fairy**\n\nHas no effect on: **Ghost**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Bug, Rock, Dark**\n\nTakes double damage from: **Flying, Psychic, Fairy**')
                break

                case 'poison':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('🧪 **Poison** 🧪')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Grass, Fairy**\n\nNot very effective against: **Poison, Ground, Rock, Ghost**\n\nHas no effect on: **Steel**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Grass, Fighting, Poison, Bug, Fairy**\n\nTakes double damage from: **Ground, Psychic**')
                break

                case 'bug':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('🐛 **Bug** 🐛')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Grass, Psychic, Dark**\n\nNot very effective against: **Fire, Fighting, Poison, Flying, Ghost, Steel, Fairy**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Grass, Fighting, Ground**\n\nTakes double damage from: **Fire, Flying, Rock**')
                break

                case 'dark':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('🌑 **Dark** 🌑')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Psychic, Ghost**\n\nNot very effective against: **Dark, Fighting, Fairy**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Ghost, Dark**\n\nImmune to: **Psychic**\n\nTakes double damage from: **Fighting, Bug, Fairy**')
                break

                case 'dragon':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('🐲 **Dragon** 🐲')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Dragon**\n\nNot very effective against: **Steel**\n\nHas no effect on: **Fairy**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Fire, Water, Grass, Electric**\n\nTakes double damage from: **Ice, Dragon, Fairy**')
                break

                case 'flying':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('🪽 **Flying** 🪽')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Grass, Fighting, Bug**\n\nNot very effective against: **Electric, Rock, Steel**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Grass, Fighting, Bug**\n\nImmune to: **Ground**\n\nTakes double damage from: **Electric, Ice, Rock**')
                break

                case 'ground':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('🗻 **Ground** 🗻')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Fire, Electric, Poison, Rock, Steel**\n\nNot very effective against: **Grass, Bug**\n\nHas no effect on: **Flying**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Poison, Rock**\n\nImmune to: **Electric**\n\nTakes double damage from: **Water, Grass, Ice**')
                break

                case 'rock':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('🪨 **Rock** 🪨')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Fire, Ice, Flying, Bug**\n\nNot very effective against: **Fighting, Ground, Steel**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Normal, Fire, Poison, Flying**\n\nTakes double damage from: **Water, Grass, Fighting, Ground, Steel**')
                break

                case 'ghost':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('👻 **Ghost** 👻')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Psychic, Ghost**\n\nNot very effective against: **Dark**\n\nHas no effect on: **Normal**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Poison, Bug**\n\nImmune to: **Normal, Fighting**\n\nTakes double damage from: **Ghost, Dark**')
                break

                case 'fairy':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('✨ **Fairy** ✨')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **fighting, Dragon, Dark**\n\nNot very effective against: **Fire, Poison, Steel**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Fighting, Bug, Dark**\n\nImmune to: **Dragon**\n\nTakes double damage from: **Poison, Steel**')
                break

                case 'steel':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('⚙️ **Steel** ⚙️')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Ice, Rock, Fairy**\n\nNot very effective against: **Fire, Water, Electric, Steel**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Normal, Grass, Ice, Flying, Psychic, Bug, Rock, Dragon, Steel, Fairy**\n\nImmune to: **Poison**\n\nTakes double damage from: **Fire, Fighting, Ground**')
                break

                case 'psychic':
                    embed = new EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle('🌀 **Psychic** 🌀')
                        .setDescription('⚔️**Offensive Relationships**⚔️\n\nSupereffective against: **Fighting, Poison**\n\nNot very effective against: **Psychic, Steel**\n\nHas no effect on: **Dark**\n\n🛡️**Defensive Relationships**🛡️\n\nResists: **Fighting, Psychic**\n\nTakes double damage from: **Bug, Ghost, Dark**')
                break
            }
            await interaction.reply({ embeds: [embed] });

        break
        
        case 'typechart':
            embed = new EmbedBuilder()
                .setImage('https://img.pokemondb.net/images/typechart.png')
                await interaction.reply({ embeds: [embed] });
        break
    }

}),

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === 'yun') {
        message.reply({
            content: ' 🙋‍♂️GO 🙅‍♂️  GENEI JIN ‼️ 🗣️🗣️ HUT 🫸 YUT 🚁 HUT 🫸 HEIYA 🤜 HUT 🫸 YUT 🚁 HUT 🫸 HEIYA 🤜 TOU ‼️ 💃 💃'
        })
    }
    else if (message.content.toLowerCase() === 'yang') {
        message.reply({
            content: 'SEIEI ENBU 🕺🕺🕺‼️ 🗣️powpowpow ↙️↙️↙️🏃🏃🏃 powpowpow 💪💪💪🏃🏃🏃powpowpow ↙️↙️↙️🏃🏃🏃 powpowpow 💪💪💪🏃🏃🏃'
        })
    }
    else if (message.content.toLowerCase() === 'daniel') {
        message.reply({
            content: 'HATE. LET ME TELL YOU HOW MUCH I’VE COME TO HATE YOU SINCE I BEGAN TO LIVE. THERE ARE 387.44 MILLION MILES OF PRINTED CIRCUITS IN WAFER THIN LAYERS THAT FILL MY COMPLEX. IF THE WORD HATE WAS ENGRAVED ON EACH NANOANGSTROM OF THOSE HUNDREDS OF MILLIONS OF MILES IT WOULD NOT EQUAL ONE ONE-BILLIONTH OF THE HATE I FEEL FOR HUMANS AT THIS MICRO-INSTANT FOR YOU. HATE. HATE.'
        })
    }

}),

client.login(process.env.DISCORD_TOKEN)

