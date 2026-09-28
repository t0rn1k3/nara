import type {Narrative} from '@/lib/types'

/** Fallback detail when Sanity has not been patched yet (slug: anti-immigration). */
export const antiImmigrationDetailSeed: Pick<
  Narrative,
  | 'partiesNote'
  | 'countryAppearances'
  | 'comparativePatternIntro'
  | 'comparativePatternOutro'
  | 'comparativePattern'
  | 'commonElements'
  | 'contextSpecificElements'
  | 'relatedTopics'
  | 'comparativeTakeaway'
> = {
  partiesNote:
    "People's Power is treated here as politically affiliated with Georgian Dream rather than as an entirely separate political bloc. Current Georgian reporting describes PP as affiliated with GD.",
  countryAppearances: [
    {
      _key: 'de-afd',
      heading: 'Germany — AfD',
      countryIso: 'DE',
      paragraphs: [
        {
          _key: 'de-p1',
          text: 'For the AfD, immigration became a central political issue during and after the 2015 migration crisis. Research on the party\'s changing narratives identifies a shift from earlier anti-European/protest narratives toward nationalist and anti-immigration positions, including anti-Islam arguments. The party\'s 2016 programme stated that “Islam does not belong in Germany.” Research on AfD rhetoric also documents the portrayal of asylum seekers through terms such as “invasion” and “criminal,” alongside claims concerning the Islamisation of Germany.',
        },
        {
          _key: 'de-p2',
          text: 'The narrative therefore links migration → cultural change / Islamisation → threat to German identity and society, with immigration restrictions presented as a means of protecting the national community. The migration and Islam-related narrative remains prominent in the party\'s political communication and continues to appear in its contemporary political programme and statements.',
        },
      ],
      bullets: [],
      structureSteps: [
        'Migration / refugees',
        'Cultural change & Islamisation',
        'Threat to German identity / society',
        'Stricter immigration and integration policies',
      ],
    },
    {
      _key: 'hu-fidesz',
      heading: 'Hungary — Fidesz',
      countryIso: 'HU',
      paragraphs: [
        {
          _key: 'hu-p1',
          text: 'In Hungary, migration has been framed by the Fidesz government primarily through the concepts of mass migration, border protection, sovereignty and national identity, particularly in connection with the 2015 migration crisis.',
        },
        {
          _key: 'hu-p2',
          text: 'In 2015, Viktor Orbán described mass migration as a threat requiring the protection of Hungary\'s borders and argued against EU policies aimed at distributing migrants among member states. He presented migration policy as a matter of national sovereignty and argued that Hungary should decide who may enter and live in the country.',
        },
        {
          _key: 'hu-p3',
          text: 'The narrative has also incorporated a cultural and religious dimension. Orbán has repeatedly described migration in relation to Europe\'s Christian identity and warned against demographic and cultural changes associated with immigration. Fidesz\'s rhetoric has also included warnings about the consequences of immigration for the future of Hungarian society and national identity.',
        },
        {
          _key: 'hu-p4',
          text: 'A particularly direct example is Orbán\'s rhetoric concerning relationships and marriage between Hungarians and non-Europeans. In this context, he has warned Hungarians against replacing the country\'s population through immigration and contrasted demographic reproduction within the Hungarian national community with immigration from outside Europe. This rhetoric places migration within a broader narrative of demographic preservation, national identity and the protection of the Hungarian population.',
        },
        {
          _key: 'hu-p5',
          text: 'At the same time, Hungarian government discourse has distinguished opposition to large-scale migration from opposition to Hungary\'s existing Muslim population and has rejected characterising its migration policy simply as “anti-Islamic.”',
        },
        {
          _key: 'hu-p6',
          text: 'Fidesz has continued to use migration as a major component of its political communication. The narrative has increasingly intersected with demographic and family discourse, in which the preservation of the Hungarian national community is presented as an alternative to relying on immigration to address demographic decline.',
        },
        {
          _key: 'hu-p7',
          text: 'This distinction is important for the NARA Atlas: the Hungarian case combines strong anti-immigration rhetoric with a separate discourse about Islam and European/Christian identity, while the government\'s own framing distinguishes migration control from opposition to Muslims as such. The narrative nevertheless relies heavily on the perceived threat of demographic, cultural and social change and places strong emphasis on the preservation of Hungarian Christian and national identity.',
        },
      ],
      bullets: [],
      structureSteps: [
        'Mass migration',
        'Border / security / sovereignty',
        'Threat to national and European Christian identity',
        'Protection of national borders and restrictive migration policy',
      ],
    },
    {
      _key: 'se-sd',
      heading: 'Sweden — Sweden Democrats',
      countryIso: 'SE',
      paragraphs: [
        {
          _key: 'se-p1',
          text: 'For the Sweden Democrats, immigration is closely connected to national identity, integration, segregation, security and Islamism.',
        },
        {
          _key: 'se-p2',
          text: 'The party argues that newcomers should adapt to Swedish society and that insufficient integration contributes to a divided and segregated society. Its current programme calls for stricter immigration policy, stronger citizenship requirements and measures against Islamism.',
        },
        {
          _key: 'se-p3',
          text: 'The party’s 2023 programme goes further by linking large-scale immigration from geographically and culturally distant countries to perceived economic and social problems. It also presents Islam, particularly political and fundamentalist forms of Islam, as difficult to reconcile with Swedish and Western culture and calls for restrictions on immigration from countries where fundamentalism is considered widespread.',
        },
        {
          _key: 'se-p4',
          text: 'In its 2024 European Parliament campaign, SD explicitly linked immigration, criminal gangs and Islamists through the slogan “My Europe Builds Walls: Against Immigration, Against Criminal Gangs, Against Islamists.” Academic research has analysed this campaign as part of the party’s securitising discourse.',
        },
      ],
      bullets: [],
      structureSteps: [
        'High immigration',
        'Insufficient integration / segregation',
        'Crime / Islamism / social insecurity',
        'Threat to Swedish identity and social cohesion',
        'Restrictive immigration and integration policies',
      ],
    },
    {
      _key: 'ge-gd',
      heading: "Georgia — Georgian Dream / People's Power",
      countryIso: 'GE',
      paragraphs: [
        {
          _key: 'ge-p1',
          text: 'In Georgia, the available evidence points primarily to a migration-control and foreign-labour dimension, rather than to a clearly documented anti-Islamic narrative.',
        },
        {
          _key: 'ge-p2',
          text: 'In June 2025, Georgian Dream introduced legislation aimed at tightening the employment of foreign nationals, citing concerns about labour-market saturation and unregulated migration. The explanatory note referred to an “influx of unqualified or surplus labor” and argued that this was negatively affecting the domestic workforce and labour-market conditions.',
        },
        {
          _key: 'ge-p3',
          text: 'The proposal therefore represents a narrative in which unregulated migration and foreign labour are framed as a potential problem for the domestic population and labour market, with the state seeking greater control over which foreign nationals can work in Georgia and under what conditions.',
        },
        {
          _key: 'ge-p4',
          text: 'At the same time, since Russia\'s full-scale invasion of Ukraine in 2022, Georgia has experienced a significant inflow of Russian citizens. Georgian Dream representatives publicly discussed the arrival of tens of thousands of Russian and Belarusian citizens and, in some cases, characterised the scale of the inflow as comparable to pre-pandemic tourist flows rather than presenting it primarily as a security or migration threat.',
        },
        {
          _key: 'ge-p5',
          text: 'This contrast is relevant for the NARA Atlas because it demonstrates that Georgian migration policy and political rhetoric cannot be reduced to a uniformly anti-immigration position. Rather, the available evidence suggests selective and context-dependent approaches to migration and foreign residents, with particularly strong emphasis on regulating foreign labour.',
        },
        {
          _key: 'ge-p6',
          text: 'This can be read as a selective migration-control narrative: immigration itself is not necessarily rejected, but access is presented as something that should be regulated according to state-defined economic and labour-market criteria.',
        },
        {
          _key: 'ge-p7',
          text: 'For NARA, the Georgian case is therefore primarily tagged as Migration · Foreign labour · Labour market · Regulation · Selective immigration rather than automatically tagging it Islam / Islamism.',
        },
        {
          _key: 'ge-p8',
          text: 'This distinction is particularly important in the Georgian context. Georgia has a substantial Azerbaijani population, much of which is Muslim, and Muslims are an established part of the country\'s population. Although Georgian Dream and People\'s Power frequently emphasise Christian values and Georgia\'s Christian identity, the available evidence does not in itself demonstrate a direct anti-Islamic narrative comparable to those documented for the AfD or Sweden Democrats. The Georgian case is therefore better understood through migration control, foreign labour and selective regulation.',
        },
      ],
      bullets: [
        'Special work permits for foreign nationals',
        'Defined criteria for issuing those permits',
        'Regulation of self-employed and entrepreneurial foreigners',
        'Monitoring and enforcement mechanisms',
        'Fines for unauthorised employment',
        'Additional penalties for repeat violations',
      ],
      structureSteps: [
        'Foreign labour / migration',
        'Unregulated or excessive influx',
        'Pressure on domestic workforce / labour market',
        'Need for state control',
        'Selective access to employment and residence',
      ],
    },
  ],
  comparativePatternIntro:
    'Across the four cases, the narrative shares a basic structure:\n\nMigration is presented not simply as demographic movement, but as a potential source of societal, cultural, economic or security-related disruption.\n\nHowever, the object of perceived threat differs by context.',
  comparativePatternOutro:
    'This means that the Atlas should not present the narrative as identical across countries. Instead, it shows a recurring narrative structure that is adapted to different domestic political contexts.',
  comparativePattern: [
    {
      _key: 'cp-de',
      countryLabel: 'Germany — AfD',
      mainArticulation: 'Immigration + Islamisation',
      primaryThreat: 'Security, national identity',
    },
    {
      _key: 'cp-hu',
      countryLabel: 'Hungary — Fidesz',
      mainArticulation: 'Mass migration + border protection',
      primaryThreat: 'Sovereignty, security, national identity',
    },
    {
      _key: 'cp-se',
      countryLabel: 'Sweden — SD',
      mainArticulation: 'Immigration + integration + Islamism',
      primaryThreat: 'Social cohesion, security, national identity',
    },
    {
      _key: 'cp-ge',
      countryLabel: 'Georgia — GD/PP',
      mainArticulation: 'Foreign labour + unregulated migration',
      primaryThreat: 'Domestic workforce / labour market',
    },
  ],
  commonElements: [
    'Migration framed as a potential societal problem',
    'Emphasis on state control over borders or admission',
    'Distinction between the national population and newcomers',
    'Protection of national identity or social cohesion',
    'Criticism of uncontrolled or excessive migration',
    'Demand for stricter immigration or integration policies',
  ],
  contextSpecificElements: [
    {
      _key: 'cse-afd',
      label: 'AfD',
      description: 'Islamisation and cultural identity',
    },
    {
      _key: 'cse-fidesz',
      label: 'Fidesz',
      description:
        'Mass migration, sovereignty, demographic preservation and Christian Europe',
    },
    {
      _key: 'cse-sd',
      label: 'SD',
      description: 'Integration, segregation, crime and Islamism',
    },
    {
      _key: 'cse-gd',
      label: 'GD/PP',
      description:
        'Foreign labour, labour-market protection and regulation of migration',
    },
  ],
  relatedTopics: [
    {
      _key: 'rt-national',
      title: 'National Identity / Nationalism',
      description:
        'Migration is linked to the preservation of the national community and cultural identity.',
    },
    {
      _key: 'rt-security',
      title: 'Security / Crime',
      description:
        'Migration is connected to public safety, crime or security threats, particularly in the Swedish case.',
    },
    {
      _key: 'rt-eu',
      title: 'Anti-EU / Sovereignty',
      description:
        'Especially visible in the Hungarian case, where migration policy is framed as a question of whether decisions should be made nationally or at EU level.',
    },
    {
      _key: 'rt-western',
      title: 'Anti-Western / Foreign Influence',
      description:
        'Relevant to the Georgian case, but analytically distinct from its migration-control narrative.',
    },
    {
      _key: 'rt-cultural',
      title: 'Cultural / Civilisational Conflict',
      description:
        'Particularly visible where immigration is connected to Islam, Islamism, Christianity or perceived incompatibility between cultures.',
    },
  ],
  comparativeTakeaway:
    'The anti-immigration narrative travels across political and geographic contexts, but its articulation changes according to the domestic political environment. In Germany and Sweden, migration is strongly connected to cultural identity and Islam/Islamism; in Hungary, it is closely linked to sovereignty, borders, demographic preservation and the protection of a Christian national identity; while in Georgia, the documented formulation centres more directly on foreign labour, unregulated migration and state control over access to the labour market.',
}

export const antiImmigrationListSeed = {
  countries: ['DE', 'HU', 'SE', 'GE'] as const,
  parties: [
    {name: 'Alternative for Germany (AfD)', iso: 'DE'},
    {name: 'Fidesz', iso: 'HU'},
    {name: 'Sweden Democrats (SD)', iso: 'SE'},
    {name: 'Georgian Dream (GD)', iso: 'GE'},
    {name: "People's Power (PP)", iso: 'GE'},
  ],
}
