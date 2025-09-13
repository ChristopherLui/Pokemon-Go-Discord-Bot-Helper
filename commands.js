import { REST, Routes, SlashCommandBuilder } from 'discord.js';

export const dex = new SlashCommandBuilder()
    .setName('dex')
    .setDescription('Look up a pokemon')
    .addStringOption(option =>
      option.setName('pokemon')
      .setDescription('Enter the name of the pokemon')
      .setRequired(true)
    )

export const commands = [
    
    dex.toJSON(),

    new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides information about the user')
    .toJSON(),

    new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!')
    .toJSON(),

    new SlashCommandBuilder()
    .setName('typechart')
    .setDescription('Generate full type chart')
    .toJSON(),

    new SlashCommandBuilder()
    .setName('type')
    .setDescription('Check type weaknesses and advantages')
    .addSubcommand(subcommand => subcommand.setName('water')
                .setDescription('Check type matchups for Water types'))

    .addSubcommand(subcommand => subcommand.setName('fire')
                .setDescription('Check type matchups for Fire types'))

    .addSubcommand(subcommand => subcommand.setName('grass')
                .setDescription('Check type matchups for Grass types'))

    .addSubcommand(subcommand => subcommand.setName('normal')
                .setDescription('Check type matchups for Normal types'))

    .addSubcommand(subcommand => subcommand.setName('electric')
                .setDescription('Check type matchups for Electric types'))

    .addSubcommand(subcommand => subcommand.setName('ice')
                .setDescription('Check type matchups for Ice types'))

    .addSubcommand(subcommand => subcommand.setName('fighting')
                .setDescription('Check type matchups for Fighting types'))

    .addSubcommand(subcommand => subcommand.setName('poison')
                .setDescription('Check type matchups for Poison types'))

    .addSubcommand(subcommand => subcommand.setName('bug')
                .setDescription('Check type matchups for Bug types'))

    .addSubcommand(subcommand => subcommand.setName('dark')
                .setDescription('Check type matchups for Dark types'))

    .addSubcommand(subcommand => subcommand.setName('dragon')
                .setDescription('Check type matchups for Dragon types'))

    .addSubcommand(subcommand => subcommand.setName('flying')
                .setDescription('Check type matchups for Flying types'))

    .addSubcommand(subcommand => subcommand.setName('ground')
                .setDescription('Check type matchups for Ground types'))

    .addSubcommand(subcommand => subcommand.setName('rock')
                .setDescription('Check type matchups for Rock types'))
    
    .addSubcommand(subcommand => subcommand.setName('ghost')
                .setDescription('Check type matchups for Ghost types'))

    .addSubcommand(subcommand => subcommand.setName('fairy')
                .setDescription('Check type matchups for Fairy types'))

    .addSubcommand(subcommand => subcommand.setName('steel')
                .setDescription('Check type matchups for Steel types'))

    .addSubcommand(subcommand => subcommand.setName('psychic')
                .setDescription('Check type matchups for Psychic types'))
    .toJSON()
]
