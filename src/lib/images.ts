/**
 * Curated photography library.
 *
 * Every entry is an Unsplash photo id, hand-picked so the subject actually
 * matches the category it is attached to, and load-checked against the
 * public Unsplash CDN (Unsplash+ ids 404 there, so they are excluded).
 *
 * Run `node scripts/verify-images.mjs` after editing this file.
 */

const BASE = 'https://images.unsplash.com/';

/** Build a sized, cropped Unsplash URL for a photo id. */
export function img(id: string, w: number, h: number): string {
  return `${BASE}${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export const IMAGES = {
  // ---- Visiting cards & ID cards ------------------------------------------
  'visiting-cards': [
    'photo-1628891439478-c613e85af7d6',
    'photo-1718670013921-2f144aba173a',
    'photo-1624567881801-a5a85867d990',
    'photo-1599590984817-0c15f31b1fa5',
    'photo-1565688842882-e0b2693d349a',
    'photo-1637070155805-e6fbee6ec2cf',
  ],
  'id-cards': [
    'photo-1769142726489-6f40b1c575c5',
    'photo-1769029269011-b32f787c288c',
    'photo-1671376354115-36486e3101f9',
    'photo-1671376354840-baa39f5eb9a5',
  ],
  'visiting-card-holders': [
    'photo-1624538000860-24716b9050f2',
    'photo-1579014134953-1580d7f123f3',
    'photo-1620109176813-e91290f6c795',
  ],

  // ---- Stationery & office supplies ---------------------------------------
  pens: [
    'photo-1585336261022-680e295ce3fe',
    'photo-1673208125315-dcc5bd597c99',
    'photo-1672338099451-f9f7c11a02a4',
    'photo-1699778414283-75669dd26271',
    'photo-1672338335611-006fb5b60479',
    'photo-1611619899256-5e61d4c46df9',
  ],
  'letterheads-envelopes': [
    'photo-1649019489428-70f505daacd6',
    'photo-1723398840367-4d1993648a6a',
    'photo-1566125882500-87e10f726cdc',
    'photo-1627618998627-70a92a874cc2',
    'photo-1526554850534-7c78330d5f90',
    'photo-1648994605536-10633d3e0886',
  ],
  'personal-stationery': [
    'photo-1573848953384-3be02021eb0b',
    'photo-1523634141350-ad6147665339',
    'photo-1627618997755-f12d6f6ae6fd',
  ],
  'diaries-notebooks': [
    'photo-1501618669935-18b6ecb13d6d',
    'photo-1483546416237-76fd26bbcdd1',
    'photo-1591195852468-03a01d1375d6',
    'photo-1483546363825-7ebf25fb7513',
    'photo-1599008633840-052c7f756385',
  ],
  'desk-accessories': [
    'photo-1777917845221-f92884c1b61b',
    'photo-1707413463619-8f4926d225ba',
    'photo-1771478298847-fa6b929478cd',
    'photo-1523380262778-076eb862d38f',
    'photo-1598789858997-66ad403aa8e1',
  ],
  calendars: [
    'photo-1611988615248-5d4f0b9ac31e',
    'photo-1640116565729-b5f5befc7260',
    'photo-1640116565640-51de47c7791b',
    'photo-1718815628185-2ff0f9332b32',
    'photo-1611302457661-d24c21494f2a',
  ],
  'invitation-greeting-cards': [
    'photo-1680183718072-e9b55b649698',
    'photo-1634055980590-1a44e5a8b3e4',
    'photo-1581022788558-2ffc54ee2b99',
    'photo-1638560928018-6b242cd81292',
    'photo-1627618997755-f12d6f6ae6fd',
  ],
  'stamps-files-folders': [
    'photo-1619418602850-35ad20aa1700',
    'photo-1782364742370-8bdf39cc0e3f',
    'photo-1750935578389-6e1445f5fd8d',
    'photo-1768158989131-64cbff67f292',
  ],
  'other-stationery': [
    'photo-1762427907123-c7ab022a5de7',
    'photo-1761914410572-02614b575847',
    'photo-1573848953384-3be02021eb0b',
  ],

  // ---- Apparel -------------------------------------------------------------
  'polo-t-shirts': [
    'photo-1714317438040-0e8584215699',
    'photo-1714317437555-bdaa756ade0b',
    'photo-1586363090844-099253d6a1cb',
    'photo-1586363104862-3a5e2ab60d99',
    'photo-1489987707025-afc232f7ea0f',
  ],
  'round-neck-t-shirts': [
    'photo-1651761179569-4ba2aa054997',
    'photo-1523381294911-8d3cead13475',
    'photo-1693443687750-611ad77f3aba',
    'photo-1620799139834-6b8f844fbe61',
    'photo-1778671394516-8270eac13c42',
  ],
  shirts: [
    'photo-1602810316693-3667c854239a',
    'photo-1598033129183-c4f50c736f10',
    'photo-1603252110481-7ba873bf42ab',
    'photo-1602810319428-019690571b5b',
    'photo-1603252109612-24fa03d145c8',
  ],
  pants: [
    'photo-1583077864994-9cf6e61f2223',
    'photo-1621573094640-0b2391e9acec',
    'photo-1772110549578-125d25cfe76f',
    'photo-1618935575164-3acfd41dafa5',
  ],
  'jackets-hoodies': [
    'photo-1620799140188-3b2a02fd9a77',
    'photo-1728394604722-c1007e3edf09',
    'photo-1685328403755-de1d57e12e63',
    'photo-1699275303942-47957eea44b1',
    'photo-1581655353466-d5ad6765dd37',
  ],
  'womens-clothing': [
    'photo-1761117228880-df2425bd70da',
    'photo-1613891737415-be7670d21c19',
    'photo-1770294758906-c8762abb2c8b',
    'photo-1595331192782-2279d262be56',
  ],
  'sports-apparel': [
    'photo-1655089131279-8029e8a21ac6',
    'photo-1649520937981-763d6a14de7d',
    'photo-1624295059100-0ca889087b54',
    'photo-1644175563233-ef4cd92531dc',
    'photo-1582586302869-715be816f60b',
  ],
  caps: [
    'photo-1521369909029-2afed882baee',
    'photo-1645266729222-17cd32e06fd0',
    'photo-1653704841996-c2ed854aedd8',
    'photo-1466992133056-ae8de8e22809',
    'photo-1678721938524-1a3ee398de2a',
  ],

  // ---- Drinkware & lunchboxes ---------------------------------------------
  'everyday-bottles': [
    'photo-1664714628878-9d2aa898b9e3',
    'photo-1598410924570-6e37b6c54fe6',
    'photo-1706007837232-3b87661717a0',
    'photo-1605539585404-a846f1193d19',
  ],
  'insulated-bottles-flasks': [
    'photo-1605539582747-ce302b9afca2',
    'photo-1571162141779-2253174d5dc2',
    'photo-1521752191297-b38bf3be4901',
    'photo-1786785755489-21bf73d305e8',
  ],
  'tumblers-quenchers': [
    'photo-1642698043660-a3827ca09337',
    'photo-1780568107682-537870a1fa08',
    'photo-1588793076577-4c2b666452d3',
    'photo-1589905490669-a9d6d6bd2f09',
    'photo-1589905490706-fb10ab224e39',
  ],
  'mugs-travel-mugs': [
    'photo-1516390118834-21602d501886',
    'photo-1643946404043-178456b0e3f8',
    'photo-1514228742587-6b1558fcca3d',
    'photo-1605714196241-00bf7a8fe7bb',
    'photo-1650959858546-d09833d5317b',
    'photo-1661399086686-20ce9ecd398b',
  ],
  'glass-bottles': [
    'photo-1523362628745-0c100150b504',
    'photo-1624469786827-13be4e09a992',
    'photo-1592720951928-7228e0d635af',
    'photo-1595994195534-d5219f02f99f',
    'photo-1520090377527-6090c8a99dad',
  ],
  'lunch-boxes': [
    'photo-1569420077790-afb136b3bb8c',
    'photo-1784979472083-dd3c4c109345',
    'photo-1575833947349-69324d765146',
  ],

  // ---- Marketing -----------------------------------------------------------
  signages: [
    'photo-1472851294608-062f824d29cc',
    'photo-1571204829887-3b8d69e4094d',
    'photo-1753351058582-e1c2c89411bc',
    'photo-1584252325944-bcf1067d37e3',
    'photo-1782879428404-089f54db126d',
  ],
  'flyers-brochures': [
    'photo-1695634621375-0b66a9d5d1bc',
    'photo-1695634621121-691d54259d37',
    'photo-1695634621145-9133286e0247',
    'photo-1586436009275-32abcb2547bd',
    'photo-1695634365014-7debec896789',
  ],
  booklets: [
    'photo-1661523892060-c9ab9eac3291',
    'photo-1661523892192-dc872b45c290',
    'photo-1759215524566-8aea4761a926',
    'photo-1661523892054-dace70bcb092',
  ],
  'retail-advertising': [
    'photo-1599250300435-b9693f21830d',
    'photo-1628406690081-9755572fcd77',
    'photo-1508161773455-3ada8ed2bbec',
  ],
  'promotional-bags': [
    'photo-1534452203293-494d7ddbf7e0',
    'photo-1604118464816-5e2bd7b863c2',
    'photo-1760565030243-c92ed557e8da',
    'photo-1760565030346-4b947220fe3a',
  ],
  'marketing-giveaways': [
    'photo-1727154085760-134cc942246e',
    'photo-1588257192226-c43cc6a981aa',
    'photo-1778785030070-342db4535ae3',
    'photo-1776107474290-9d788632a748',
  ],

  // ---- Gadgets & accessories ----------------------------------------------
  'power-banks-chargers': [
    'photo-1585995603413-eb35b5f4a50b',
    'photo-1644571669401-9ab344866592',
    'photo-1614399113305-a127bb2ca893',
    'photo-1635861321688-b63d28749a82',
  ],
  appliances: [
    'photo-1740803292822-a742c6a4fef0',
    'photo-1484154218962-a197022b5858',
    'photo-1597418048367-7dd01e4404ee',
  ],
  'laptop-accessories': [
    'photo-1647779098515-687bdba939e1',
    'photo-1787366681962-4a435fb6a8ea',
    'photo-1583418855863-858dc79c2d19',
    'photo-1787366681991-32376036aa9a',
  ],
  'earbuds-headphones': [
    'photo-1590658268037-6bf12165a8df',
    'photo-1606220588913-b3aacb4d2f46',
    'photo-1600294037681-c80b4cb5b434',
    'photo-1580477371194-4593e3c7c6cf',
  ],
  'bluetooth-speakers': [
    'photo-1608043152269-423dbba4e7e1',
    'photo-1589256469067-ea99122bbdc4',
    'photo-1589003077984-894e133dabab',
    'photo-1582978571763-2d039e56f0c3',
    'photo-1589001181560-a8df1800e501',
  ],
  'desk-gadgets': [
    'photo-1523380262778-076eb862d38f',
    'photo-1598789858997-66ad403aa8e1',
    'photo-1648028783039-c757ba417925',
    'photo-1605194004886-56d82f482d53',
  ],
  'smart-devices': [
    'photo-1579586337278-3befd40fd17a',
    'photo-1617043983671-adaadcaa2460',
    'photo-1461141346587-763ab02bced9',
    'photo-1434493789847-2f02dc6ca35d',
  ],
  'vr-headsets': [
    'photo-1622979135225-d2ba269cf1ac',
    'photo-1605647540924-852290f6b0d5',
    'photo-1626379961798-54f819ee896a',
  ],
  'keyboards-mouse': [
    'photo-1511467687858-23d96c32e4ae',
    'photo-1584727151652-d09b17ebf23f',
    'photo-1519162721257-18cd195350c2',
    'photo-1584727129739-cd30984745bc',
    'photo-1652850494316-3d30b01debca',
  ],

  // ---- Bags ----------------------------------------------------------------
  'tech-organisers': [
    'photo-1634839763563-97d93f8131c6',
    'photo-1634839763121-58fcfed2a94a',
    'photo-1639084695283-397de7c2fb4e',
    'photo-1634839763037-a3e798e325ee',
  ],
  'laptop-bags': [
    'photo-1622560481156-01fc7e1693e6',
    'photo-1528921581519-52b9d779df2b',
    'photo-1577733966973-d680bffd2e80',
    'photo-1568247067952-eab2ce84a349',
  ],
  'laptop-sleeves': [
    'photo-1689757855413-9e366c2011f1',
    'photo-1675668409245-955188b96bf6',
    'photo-1689757875266-66446af145dc',
  ],
  'luggage-bags': [
    'photo-1639598003276-8a70fcaaad6c',
    'photo-1670888664952-efff442ec0d2',
    'photo-1581553680321-4fffae59fccd',
    'photo-1714235058817-af16a662fe1d',
  ],
  'ladies-handbags': [
    'photo-1605733513597-a8f8341084e6',
    'photo-1652427019217-3ded1a356f10',
    'photo-1640901555383-7335ec5a6476',
    'photo-1618274199869-89066d856879',
  ],
  'travel-accessories': [
    'photo-1613896640137-bb5b31496315',
    'photo-1606970289550-b8089bc33ba0',
    'photo-1759002321159-9e657a3bb2d2',
  ],
  'hiking-bags': [
    'photo-1476979735039-2fdea9e9e407',
    'photo-1622260614927-208cfe3f5cfd',
    'photo-1499803270242-467f7311582d',
    'photo-1537430802614-118bf14be50c',
  ],
  wallets: [
    'photo-1579014134953-1580d7f123f3',
    'photo-1624538000860-24716b9050f2',
    'photo-1620109176813-e91290f6c795',
    'photo-1637486069202-b1163268c240',
  ],
  'tote-bags': [
    'photo-1574365569389-a10d488ca3fb',
    'photo-1630381260512-e3fe55c11973',
    'photo-1535981444082-2a5dc0548ef3',
    'photo-1618864746159-ec96c3a32ce7',
    'photo-1678922098020-95700a892472',
  ],

  // ---- Kits, hampers & gifting --------------------------------------------
  'joining-kits': [
    'photo-1701686794404-3670ea43687e',
    'photo-1676729353106-2d0f7a370135',
    'photo-1730818029039-662126e61821',
  ],
  chocolates: [
    'photo-1687795097254-f019f9d7fd17',
    'photo-1526081715791-7c538f86060e',
    'photo-1734692928513-351516b38869',
    'photo-1566565286951-f81c7ba5619d',
    'photo-1599599810769-bcde5a160d32',
  ],
  'gift-hampers': [
    'photo-1674620213535-9b2a2553ef40',
    'photo-1647221598398-934ed5cb0e4f',
    'photo-1759563871375-d5b140f6646e',
    'photo-1713496736683-ffb12c754c27',
    'photo-1633683788767-ac390c4bf988',
    'photo-1647221598276-124ebb861536',
    'photo-1697717852279-cc39a8eb481a',
    'photo-1513201099705-a9746e1e201f',
    'photo-1671150590216-f138600130ce',
    'photo-1669994814741-fa5a07c97c67',
    'photo-1759563876829-47c081a2afd9',
    'photo-1764454198668-a8ffdadf5513',
  ],

  // ---- Awards --------------------------------------------------------------
  trophies: [
    'photo-1578269174936-2709b6aeb913',
    'photo-1705925716592-259267037a03',
    'photo-1677640724372-adb865d29aa8',
    'photo-1648538874920-5deefcb65673',
  ],
  'mementos-plaques': [
    'photo-1576723420434-19d0e8be3b6a',
    'photo-1737294556296-62f528b88e1e',
    'photo-1747049836963-c4afbe96ad71',
  ],
  certificates: [
    'photo-1638636241638-aef5120c5153',
    'photo-1755540735876-ff503cf594fe',
    'photo-1765137138067-38429bc553e5',
    'photo-1755543042372-89f16b28dd73',
  ],

  // ---- Labels, stickers & packaging ---------------------------------------
  stickers: [
    'photo-1591241880902-7f05d345516e',
    'photo-1669720974831-47816c252ff1',
    'photo-1726850577677-51affd80deb2',
    'photo-1669292618188-7446a2cc1f07',
  ],
  labels: [
    'photo-1700893417209-18dc88c989a0',
    'photo-1697115355157-c95fbd5250fd',
    'photo-1635674686943-01e7431e91c4',
    'photo-1700893417207-99da24343476',
    'photo-1700893417238-ce7c7f427996',
  ],
  tags: [
    'photo-1571907483086-3c0ea40cc16d',
    'photo-1571907483091-fbe746bee132',
    'photo-1731036329820-74e286b68cc6',
    'photo-1671376354578-3bbc3d0d66d7',
  ],
  'paper-bags': [
    'photo-1534452203293-494d7ddbf7e0',
    'photo-1604118464816-5e2bd7b863c2',
    'photo-1760565030243-c92ed557e8da',
  ],
  'gift-boxes': [
    'photo-1513201099705-a9746e1e201f',
    'photo-1671150590216-f138600130ce',
    'photo-1674620213535-9b2a2553ef40',
    'photo-1669994814741-fa5a07c97c67',
  ],
  'food-packaging': [
    'photo-1648587456176-4969b0124b12',
    'photo-1597974828431-9078248d8cc9',
    'photo-1597514402413-17eac2b501c0',
    'photo-1626253934161-08cfea22e968',
    'photo-1597317292822-d0fa5be43aea',
  ],

  // ---- Photo products ------------------------------------------------------
  'framed-prints': [
    'photo-1513519245088-0e12902e5a38',
    'photo-1452457005517-a0dd81caca2a',
    'photo-1787507136009-19ae8d98d867',
    'photo-1630955988408-3350b8ca0f01',
  ],
  'photo-gifts': [
    'photo-1638560928314-878d82b51cd4',
    'photo-1765210866964-5e89d82a8eb9',
    'photo-1607077518188-9a7ca2d86cab',
  ],
  'canvas-prints': [
    'photo-1775026880807-97d4d9585bf0',
    'photo-1758192178254-f4e4dbc1d754',
    'photo-1775026880839-391a076cd3d5',
    'photo-1659038080639-fe3343f4b19a',
  ],

  // ---- Health & ergonomics -------------------------------------------------
  'ergonomic-accessories': [
    'photo-1681418659069-eef28d44aeab',
    'photo-1594636797501-ef436e157819',
    'photo-1600443546015-f9b924a5b416',
    'photo-1524820801657-fd59673fbb05',
  ],
  'health-wellness': [
    'photo-1584735935682-2f2b69dff9d2',
    'photo-1591291621164-2c6367723315',
    'photo-1683758507025-6e74ad3ca1e5',
    'photo-1697129392091-d08875930fec',
  ],
  'eco-friendly-items': [
    'photo-1583642037383-861ac716c3f0',
    'photo-1620870300436-a70b605f6ebe',
    'photo-1695469773735-3fd25fdbf3af',
    'photo-1618928835651-b8b5ef6a9175',
  ],

  // ---- Editorial / marketing imagery ---------------------------------------
  festive: [
    'photo-1577083753695-e010191bacb5',
    'photo-1635192592106-77a5aacbe1a3',
    'photo-1636227597176-c554bcbee419',
    'photo-1605302977545-3a09913be1dd',
    'photo-1718476971217-677d43112daa',
    'photo-1680459520309-189cf5b22212',
  ],
  printing: [
    'photo-1503694978374-8a2fa686963a',
    'photo-1581508512961-0e3b9524db40',
    'photo-1625820104062-387167dd655b',
    'photo-1693031630157-7ecc8d06de63',
  ],
} as const satisfies Record<string, readonly string[]>;

export type ImageKey = keyof typeof IMAGES;

/**
 * Pick the nth image for a key, wrapping around so a category with four
 * photos can still dress twenty products without repeating two in a row.
 */
export function pick(key: ImageKey, index = 0): string {
  const set = IMAGES[key];
  return set[index % set.length];
}
