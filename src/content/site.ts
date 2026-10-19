/*
 * All copy for the site, English and Turkish side by side.
 *
 * Content rules (same as the CVs):
 * - Only verified facts. Every number below traces to a report, a repository or a test log.
 * - No CGPA; ALES is the academic signal. Internships done remotely say so.
 * - "Graduate", never "student". Plain, modest wording; no hype.
 */
import type {
  AwardItem,
  Build,
  CaseStudy,
  Figure,
  L,
  LinkItem,
  PlanBar,
  PlanMilestone,
  Role,
  SkillGroup,
  Study,
  Text,
} from "./types";
import media from "./media.json";

const l = (en: string, tr: string): L => ({ en, tr });

type MediaKey = keyof typeof media;

/** A figure, if its image has been prepared (see scripts/prepare_media.py). */
function fig(key: string, alt: Text, caption: Text, frame: Figure["frame"] = "plain"): Figure | undefined {
  const entry = (media as Record<string, { width: number; height: number }>)[key as MediaKey];
  if (!entry) return undefined;
  return { src: `/media/${key}`, width: entry.width, height: entry.height, alt, caption, frame };
}

const present = <T,>(items: (T | undefined)[]): T[] => items.filter((x): x is T => x !== undefined);

/* ------------------------------------------------------------------ people */

export const person = {
  name: "Bahadır Maral",
  siteUrl: "https://thynatos.github.io",
  email: "bahadirmaral00@gmail.com",
  github: "https://github.com/Thynatos",
  linkedin: "https://www.linkedin.com/in/bahadirmaral",
  updated: l("19 October 2026", "19 Ekim 2026"),
  updatedMonth: "2026-10",
};

/* ---------------------------------------------------------------- UI text */

export const ui = {
  skip: l("Skip to content", "İçeriğe geç"),
  nav: [
    { href: "#work", label: l("Work", "Projeler") },
    { href: "#studies", label: l("Studies", "Çalışmalar") },
    { href: "#experience", label: l("Experience", "Deneyim") },
    { href: "#awards", label: l("Awards", "Ödüller") },
    { href: "#skills", label: l("Skills", "Yetkinlikler") },
    { href: "#contact", label: l("Contact", "İletişim") },
  ],
  langSwitch: {
    en: { label: "EN", aria: "English version", href: "/" },
    tr: { label: "TR", aria: "Türkçe sürüm", href: "/tr/" },
  },
  myPart: l("My part", "Benim katkım"),
  results: l("Results", "Sonuçlar"),
  builtWith: l("Built with", "Kullanılanlar"),
  links: l("Links", "Bağlantılar"),
  figureOf: l("Figure", "Görsel"),
  show: l("Show figure", "Görseli göster"),
  steps: l("Steps", "Adımlar"),
  openStudy: l("Open study", "Çalışmayı aç"),
  usedIn: l("Used in", "Kullanıldığı yer"),
  skill: l("Skill", "Yetkinlik"),
  scrollHint: l("Scroll the plan sideways", "Planı yana kaydırın"),
};

export const meta = {
  title: l("Bahadır Maral · Industrial engineer", "Bahadır Maral · Endüstri mühendisi"),
  description: l(
    "Industrial engineer (Bilkent, 2026) building optimization, data and software tools for production and logistics. Projects, studies and measured results.",
    "Üretim ve lojistik için optimizasyon, veri ve yazılım araçları geliştiren endüstri mühendisi (Bilkent, 2026). Projeler, çalışmalar ve ölçülen sonuçlar.",
  ),
};

/* ------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: l("Industrial engineer · Ankara, Türkiye", "Endüstri mühendisi · Ankara"),
  headline: l(
    "I build planning tools and test them on real operations.",
    "Planlama araçları geliştirip gerçek operasyonlarda test ediyorum.",
  ),
  intro: l(
    "I graduated in industrial engineering from Bilkent University in 2026, and I work where optimization, data and software meet. For my senior design project, our team built a production planning system that BobaCo’s planners used in a four-week pilot. I also build web and Android apps, and I am currently in the AI program at Samsung Innovation Campus.",
    "2026’da Bilkent Üniversitesi Endüstri Mühendisliği bölümünden mezun oldum; optimizasyon, veri ve yazılımın kesiştiği yerde çalışıyorum. Bitirme projemizde ekibimizle bir üretim planlama sistemi geliştirdik; BobaCo’nun planlamacıları bu sistemi dört haftalık bir pilot çalışmada kullandı. Web ve Android uygulamaları da geliştiriyorum; şu anda Samsung Innovation Campus Yapay Zekâ programındayım.",
  ),
  facts: [
    {
      label: l("Degree", "Lisans"),
      value: l("B.S. Industrial Engineering, Bilkent University, 2026", "Endüstri Mühendisliği, Bilkent Üniversitesi, 2026"),
    },
    {
      label: l("ALES quantitative", "ALES sayısal"),
      value: l("93.9 / 100, top 0.2%", "93,9 / 100, ilk %0,2"),
      note: l("Türkiye’s national graduate entrance exam", "Lisansüstü eğitim giriş sınavı"),
    },
    { label: l("English", "İngilizce"), value: l("IELTS 8.0", "IELTS 8.0") },
    { label: l("Based in", "Konum"), value: l("Ankara, Türkiye", "Ankara") },
  ],
  links: [
    { label: "GitHub", href: person.github },
    { label: "LinkedIn", href: person.linkedin },
    { label: l("Email", "E-posta"), href: `mailto:${person.email}` },
  ] as LinkItem[],
};

/* -------------------------------------------------------------- plan view */

export const plan = {
  label: l("Plan view", "Plan görünümü"),
  title: l("2024 to now, drawn as a production schedule", "2024’ten bugüne, bir üretim çizelgesi olarak"),
  caption: l(
    "Bars are internships, projects and programs; diamonds are results. Select a bar to jump to it.",
    "Çubuklar staj, proje ve programları, elmaslar sonuçları gösteriyor. Ayrıntıya gitmek için bir çubuğa tıklayın.",
  ),
  from: "2024-07",
  to: "2026-12",
  now: { date: "2026-10-19", label: l("Oct 2026", "Eki 2026") },
  lanes: [
    { id: "results", label: l("Results", "Sonuçlar") },
    { id: "industry", label: l("Industry", "Sanayi"), rows: 2 },
    { id: "builds", label: l("Projects", "Projeler"), rows: 2 },
    { id: "programs", label: l("Programs", "Programlar"), rows: 1 },
    { id: "education", label: l("Education", "Eğitim"), rows: 1 },
  ],
  months: {
    en: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    tr: ["O", "Ş", "M", "N", "M", "H", "T", "A", "E", "E", "K", "A"],
  },
  bars: [
    { id: "inovako", lane: "industry", row: 0, start: "2024-07", end: "2024-08", label: "INOVAKO", href: "#exp-inovako", remote: true },
    { id: "botas", lane: "industry", row: 1, start: "2024-08", end: "2024-09", label: "BOTAŞ", href: "#exp-botas" },
    { id: "jeton", lane: "industry", row: 0, start: "2025-05", end: "2025-08", label: "Jeton Digital", href: "#exp-jeton", remote: true },
    { id: "kontrolmatik", lane: "industry", row: 1, start: "2025-08", end: "2025-09", label: "Kontrolmatik", href: "#exp-kontrolmatik" },
    { id: "bobaco", lane: "industry", row: 0, start: "2025-10", end: "2026-06", label: l("BobaCo · senior design", "BobaCo · bitirme projesi"), href: "#tcotz" },
    { id: "ratemygig", lane: "builds", row: 0, start: "2025-12", label: "RateMyGig", href: "#ratemygig" },
    { id: "sabanci", lane: "builds", row: 1, start: "2026-03", end: "2026-05", label: "Sabancı", href: "#sabanci" },
    { id: "esik", lane: "builds", row: 1, start: "2026-08", end: "2026-08", label: "Eşik", href: "#esik" },
    { id: "nudgewell", lane: "builds", row: 1, start: "2026-09", label: "NudgeWell", href: "#nudgewell" },
    { id: "erasmus", lane: "programs", row: 0, start: "2025-06", end: "2025-06", label: "Erasmus+", href: "#awards" },
    { id: "sic", lane: "programs", row: 0, start: "2026-08", label: l("Samsung Innovation Campus, AI", "Samsung Innovation Campus, YZ"), href: "#awards" },
    { id: "bilkent", lane: "education", row: 0, start: "2022-09", end: "2026-06", label: l("B.S. Industrial Engineering, Bilkent", "Endüstri Mühendisliği lisans, Bilkent"), href: "#education" },
  ] as PlanBar[],
  milestones: [
    { id: "m-sabanci", date: "2026-05-15", line: 0, label: l("2nd · Sabancı challenge", "İkincilik · Sabancı"), href: "#sabanci" },
    { id: "m-bilkent", date: "2026-06-10", line: 1, label: l("3rd · Bilkent project competition", "Üçüncülük · Bilkent proje yarışması"), href: "#tcotz" },
    { id: "m-sic", date: "2026-08-30", line: 2, label: l("1st · SIC hackathon", "Birincilik · SIC hackathonu"), href: "#esik" },
  ] as PlanMilestone[],
};

/* --------------------------------------------------------- selected work */

export const workSection = {
  label: l("Selected work", "Öne çıkan projeler"),
  title: l("Five projects, each with something real behind it", "Arkasında gerçek bir şey olan beş proje"),
  intro: l(
    "A company that used the tool, a national competition, a hackathon jury, a public dataset and a product I am still building. Each one lists my part and how the result was measured.",
    "Aracı kullanan bir şirket, ulusal bir yarışma, bir hackathon jürisi, açık bir veri seti ve hâlâ geliştirdiğim bir ürün. Her birinde kendi katkımı ve sonucun nasıl ölçüldüğünü belirttim.",
  ),
};

export const cases: CaseStudy[] = [
  {
    id: "tcotz",
    lane: "industry",
    kicker: l("Senior design project · Oct 2025 – Jun 2026 · Team of 7", "Bitirme projesi · Eki 2025 – Haz 2026 · 7 kişilik ekip"),
    title: l("Production planning for BobaCo", "BobaCo için üretim planlama"),
    award: l(
      "3rd place, Bilkent 24th Industry-Oriented Project Competition",
      "Bilkent 24. Sanayi Odaklı Proje Yarışması’nda üçüncülük",
    ),
    pitch: l(
      "A decision support system that tells a bubble tea producer what to make each day and how much stock to build before the summer peak.",
      "Bir boba çayı üreticisine her gün ne üreteceğini ve yaz zirvesinden önce ne kadar stok yapması gerektiğini gösteren bir karar destek sistemi.",
    ),
    body: [
      l(
        "BobaCo, a brand of Nesco Gıda, planned production semi-manually and met summer peaks with overtime. Two production lines, four product types, limited storage and raw-material lead times made a good plan hard to find by hand.",
        "Nesco Gıda’nın markası BobaCo, üretimini yarı manuel planlıyor ve yaz zirvelerini fazla mesaiyle karşılıyordu. İki üretim hattı, dört ürün tipi, sınırlı depo alanı ve hammadde tedarik süreleri, elle iyi bir plan yapmayı zorlaştırıyordu.",
      ),
      l(
        "We split the problem into two models. A two-stage stochastic model sets monthly production and stock targets for the year, using demand scenarios sampled within the company’s forecast ranges. A MILP then schedules each line day by day toward those targets, and the plan is re-run every week with the latest demand.",
        "Problemi iki modele böldük. İki aşamalı stokastik bir model, şirketin tahmin aralıkları içinde üretilen talep senaryolarıyla yıl için aylık üretim ve stok hedeflerini belirliyor. Ardından bir MILP modeli her hattı bu hedeflere göre gün gün çizelgeliyor; plan her hafta en güncel taleple yeniden çalıştırılıyor.",
      ),
    ],
    diagram: "planning-loop",
    role: l(
      "I worked mostly on the interface and the code that runs the models. We built the models together as a team.",
      "Ağırlıklı olarak arayüz ve modelleri çalıştıran kod üzerinde çalıştım. Modelleri ekip olarak birlikte kurduk.",
    ),
    points: [
      l(
        "Streamlit app with sign-in, daily line schedules and raw-material order suggestions, laid out like the company’s own reports.",
        "Giriş ekranı, günlük hat çizelgeleri ve hammadde sipariş önerileri olan, şirketin kendi raporlarına benzer düzende bir Streamlit uygulaması.",
      ),
      l(
        "Four-week pilot in the weekly planning routine. We supervised the first week; after that the planners ran it themselves and reviewed each plan on Monday.",
        "Haftalık planlama rutininde dört haftalık pilot çalışma. İlk haftayı biz yönettik; sonrasında planlamacılar sistemi kendileri çalıştırıp her planı pazartesi günü gözden geçirdi.",
      ),
      l(
        "Drafted for Gurobi. The delivered app runs on PuLP and HiGHS, because Gurobi could not be used in the final product.",
        "Modeller önce Gurobi için yazıldı. Gurobi son üründe kullanılamadığı için teslim edilen uygulama PuLP ve HiGHS ile çalışıyor.",
      ),
    ],
    ledger: [
      {
        basis: l(
          "Against the company’s current planning rule, across 10 demand scenarios",
          "Şirketin mevcut planlama kuralına göre, 10 talep senaryosunda",
        ),
        rows: [
          { label: l("Average overtime days", "Ortalama fazla mesai günü"), before: l("28.2", "28,2"), after: l("0.3", "0,3") },
          { label: l("Scenarios with no backlog and no overtime", "Gecikme ve fazla mesai olmayan senaryo"), before: "0/10", after: "7/10" },
          { label: l("Delayed volume, weighted", "Gecikmeli hacim (ağırlıklı)"), before: l("12.49%", "%12,49"), after: l("0.08%", "%0,08") },
        ],
      },
      {
        basis: l("Stochastic versus deterministic plan", "Stokastik ve deterministik planın karşılaştırması"),
        rows: [
          {
            label: l("Average total cost", "Ortalama toplam maliyet"),
            after: "−42%",
            note: l("Holding cost rose by 2.7M while backlog cost fell by 41.6M.", "Stok tutma maliyeti 2,7 milyon arttı, gecikme maliyeti 41,6 milyon azaldı."),
          },
        ],
      },
    ],
    stack: ["Python", "PuLP", "HiGHS", "MILP", l("Stochastic programming", "Stokastik programlama"), l("Rolling horizon", "Kayan ufuk"), "Streamlit", "pandas"],
    links: [{ label: l("Project page (in Turkish)", "Proje sayfası"), href: "https://thynatos.github.io/tcotz-landing/" }],
    figures: present([
      fig(
        "tcotz/planner.webp",
        l(
          "BobaCo Planner app: settings sidebar, an inventory chart by product, and next week's schedule for each line and machine.",
          "BobaCo Planner uygulaması: ayarlar menüsü, ürünlere göre stok grafiği ve her hat ile makine için gelecek haftanın çizelgesi.",
        ),
        l("The planner: stock plan and next week’s line schedule.", "Planlama uygulaması: stok planı ve gelecek haftanın hat çizelgesi."),
      ),
      fig(
        "tcotz/validation.webp",
        l(
          "Three stacked charts over 48 weeks: inventory builds up early, a short backlog peak appears around week 27, weekly cost follows the backlog.",
          "48 hafta boyunca üç grafik: stok erken birikiyor, 27. hafta civarında kısa bir gecikme zirvesi oluşuyor, haftalık maliyet gecikmeyi izliyor.",
        ),
        l("A validation run over 48 weeks: stock, backlog and weekly cost.", "48 haftalık bir doğrulama çalışması: stok, gecikme ve haftalık maliyet."),
      ),
    ]),
  },
  {
    id: "sabanci",
    lane: "builds",
    kicker: l("Competition · Mar – May 2026 · Team of 3", "Yarışma · Mar – May 2026 · 3 kişilik ekip"),
    title: l("Re-routing a service fleet at mid-day", "Servis filosunu gün ortasında yeniden rotalamak"),
    award: l("2nd place, Sabancı University Optimization Challenge 2026", "Sabancı Üniversitesi Optimizasyon Yarışması 2026’da ikincilik"),
    pitch: l(
      "Vending machines break down while the trucks are already on the road. The plan has to change without missing a single restock.",
      "Araçlar yoldayken otomatlar arızalanıyor. Plan, tek bir ikmali bile kaçırmadan değişmeli.",
    ),
    body: [
      l(
        "A national undergraduate operations research competition run by Sabancı University’s IE department with Datart Lab and Köpüklü. Trucks must restock every machine within its time window. At mid-day some machines fail, and the rest of each route has to be re-planned while the part already driven stays fixed.",
        "Sabancı Üniversitesi Endüstri Mühendisliği bölümünün Datart Lab ve Köpüklü ile düzenlediği ulusal bir lisans yöneylem araştırması yarışması. Araçlar her otomatı zaman penceresi içinde doldurmak zorunda. Gün ortasında bazı otomatlar arızalanıyor ve her rotanın kalan kısmı, gidilmiş kısım sabit kalarak yeniden planlanmalı.",
      ),
      l(
        "In Part I we plan the morning so trucks stay near machines that are likely to fail, ranked by a risk score r = p × d (failure probability times demand rate). In Part II we lock each route’s completed prefix and repair the rest. An adaptive large neighbourhood search (ALNS) uses most of the time budget, then a set-partitioning MILP picks the best combination of the routes it found.",
        "Birinci bölümde sabahı, araçlar arızalanma olasılığı yüksek otomatlara yakın kalacak şekilde planladık; otomatları r = p × d risk skoruyla (arıza olasılığı çarpı talep hızı) sıraladık. İkinci bölümde her rotanın tamamlanan kısmını kilitleyip kalanını onardık. Zaman bütçesinin çoğunu uyarlanabilir geniş komşuluk araması (ALNS) kullanıyor, ardından bir küme bölümleme MILP modeli bulunan rotalardan en iyi kombinasyonu seçiyor.",
      ),
    ],
    role: l(
      "I worked on the main ALNS and MILP solver in the repository. A teammate wrote an alternative split-task solver, and we benchmarked the two against each other.",
      "Depodaki ana ALNS ve MILP çözücüsü üzerinde çalıştım. Bir ekip arkadaşım görevleri bölen alternatif bir çözücü yazdı; ikisini birbiriyle karşılaştırdık.",
    ),
    ledger: [
      {
        basis: l("Final round: 10 instances × 5 failure scenarios", "Final turu: 10 örnek × 5 arıza senaryosu"),
        rows: [
          { label: l("Solutions meeting every hard constraint", "Tüm katı kısıtları sağlayan çözüm"), after: "50 / 50" },
          { label: l("Failures repaired the same day", "Aynı gün onarılan arıza"), after: l("462 / 512 (90.2%)", "462 / 512 (%90,2)") },
          { label: l("Largest instance", "En büyük örnek"), after: l("100 machines, 25 trucks", "100 otomat, 25 araç") },
        ],
      },
    ],
    stack: ["Python", "ALNS", l("MILP (set partitioning)", "MILP (küme bölümleme)"), "Gurobi", "HiGHS", "VRPTW"],
    links: [{ label: "GitHub · optchall_26_data", href: "https://github.com/Thynatos/optchall_26_data" }],
    figures: present([
      fig(
        "sabanci/routes.webp",
        l(
          "Route plot of one challenge instance: 50 machines as dots, the depot as a square, grey legs driven before mid-day, teal legs re-planned for the afternoon, and five failed machines ringed and repaired.",
          "Bir yarışma örneğinin rota çizimi: noktalarla 50 otomat, kare ile depo, gün ortasından önce gidilen gri yollar, öğleden sonra için yeniden planlanan renkli yollar ve halkayla işaretlenip onarılan beş arızalı otomat.",
        ),
        l(
          "Instance 7 (50 machines, 5 trucks). Grey legs were driven before mid-day and stay fixed; teal legs are re-planned. All 5 failed machines were repaired the same day.",
          "7. örnek (50 otomat, 5 araç). Gri yollar gün ortasından önce gidildi ve sabit kalıyor; renkli yollar yeniden planlandı. Arızalanan 5 otomatın hepsi aynı gün onarıldı.",
        ),
      ),
    ]),
  },
  {
    id: "esik",
    lane: "builds",
    kicker: l("Hackathon · Aug 2026 · Team of 5", "Hackathon · Ağu 2026 · 5 kişilik ekip"),
    title: l("Eşik: a short pause at your own limit", "Eşik: kendi sınırında kısa bir duraklama"),
    award: l(
      "1st place, Samsung Innovation Campus GenAI hackathon on digital addiction",
      "Samsung Innovation Campus dijital bağımlılık hackathonunda birincilik",
    ),
    pitch: l(
      "An Android app that adds a short, personal pause when someone reaches the daily limit they set for one app.",
      "Kullanıcının bir uygulama için belirlediği günlük sınıra ulaştığında kısa ve kişisel bir duraklama sunan Android uygulaması.",
    ),
    body: [
      l(
        "Most screen-time tools show a number or block the app. Eşik waits until the user opens the app they chose after passing their own threshold. Then an overlay asks what is going on and suggests one small alternative. The user can always continue.",
        "Ekran süresi araçlarının çoğu bir sayı gösteriyor ya da uygulamayı engelliyor. Eşik, kullanıcı kendi belirlediği eşiği geçtikten sonra seçtiği uygulamayı açmasını bekliyor. Ardından açılan bir katman o an ne olduğunu soruyor ve küçük bir alternatif öneriyor. Kullanıcı her zaman devam edebiliyor.",
      ),
      l(
        "Gemini writes the wording, but the decisions stay in code: the threshold, the timing, the cooldown and every number in the daily report. Each model output is checked against a policy, gets one repair attempt, and falls back to fixed text if it still fails. Text that signals a crisis never leaves the phone.",
        "Metinleri Gemini yazıyor ama kararlar kodda kalıyor: eşik, zamanlama, bekleme süresi ve günlük rapordaki her sayı. Modelin her çıktısı bir politikaya göre denetleniyor, bir kez onarılmaya çalışılıyor, yine olmazsa sabit metne dönülüyor. Kriz belirten metinler telefondan hiç çıkmıyor.",
      ),
    ],
    role: l("I wrote most of the Android code.", "Android kodunun büyük kısmını ben yazdım."),
    ledger: [
      {
        basis: l("Prototype tested on a physical phone (Xiaomi, Android 15)", "Fiziksel bir telefonda test edilen prototip (Xiaomi, Android 15)"),
        rows: [
          { label: l("Hackathon result", "Hackathon sonucu"), after: l("1st place", "Birincilik") },
          { label: l("Overlay after the threshold", "Eşikten sonra katmanın açılması"), after: l("6.0 s", "6,0 sn") },
          { label: l("Repeat overlays in the 15-minute cooldown", "15 dakikalık beklemede tekrar açılma"), after: "0" },
          { label: l("Unit tests", "Birim testi"), after: "84" },
        ],
      },
    ],
    stack: ["Kotlin", "Jetpack Compose", "UsageStatsManager", l("Foreground service", "Ön plan servisi"), "Gemini API", "GitHub Actions"],
    links: [{ label: "GitHub · esik-android", href: "https://github.com/Thynatos/esik-android" }],
    figures: present([
      fig(
        "esik/home.webp",
        l(
          "Eşik home screen in Turkish: today's use of the chosen app against the user's own goal, the daily reflection card and tracking settings.",
          "Eşik ana ekranı: seçilen uygulamanın bugünkü kullanımı ve kullanıcının kendi hedefi, günlük yansıma kartı ve takip ayarları.",
        ),
        l("Home: one app, one goal the user set.", "Ana ekran: tek uygulama, kullanıcının belirlediği tek hedef."),
        "phone",
      ),
      fig(
        "esik/overlay.webp",
        l(
          "The pause screen asks what is keeping the user in the app, with three quick answers and options to write or speak.",
          "Duraklama ekranı kullanıcıyı uygulamada tutan şeyi soruyor; üç hızlı yanıt ve yazma ya da anlatma seçenekleri var.",
        ),
        l("The pause: what is keeping you here?", "Duraklama: seni burada tutan ne?"),
        "phone",
      ),
      fig(
        "esik/suggestion.webp",
        l(
          "After an answer, Eşik shows one reflection question and one small step, with buttons to try it or continue anyway.",
          "Yanıttan sonra Eşik bir düşünme sorusu ve küçük bir adım gösteriyor; denemek ya da yine de devam etmek için düğmeler var.",
        ),
        l("One small step. Continuing is always allowed.", "Küçük bir adım. Devam etmek her zaman serbest."),
        "phone",
      ),
      fig(
        "esik/report.webp",
        l(
          "Daily report with numbers computed on the phone and a note that a reflection needs 7 records for the day.",
          "Telefonda hesaplanan sayılarla günlük rapor ve yansıma için günde 7 kayıt gerektiğini belirten not.",
        ),
        l("Daily report: numbers stay on the phone.", "Günlük rapor: sayılar telefonda kalıyor."),
        "phone",
      ),
    ]),
  },
  {
    id: "nudgewell",
    lane: "builds",
    kicker: l(
      "Samsung Innovation Campus capstone · Sep 2026 – now · Team of 5",
      "Samsung Innovation Campus bitirme projesi · Eyl 2026 – devam ediyor · 5 kişilik ekip",
    ),
    status: l("In progress: 2 of 5 milestones submitted", "Devam ediyor: 5 aşamanın 2’si teslim edildi"),
    title: l("NudgeWell: the moment people mean to stop", "NudgeWell: bırakmak isteyip devam edilen an"),
    pitch: l(
      "A model of the gap between intention and behaviour inside a single phone session.",
      "Tek bir telefon oturumunda niyet ile davranış arasındaki farkı modelleyen bir çalışma.",
    ),
    body: [
      l(
        "Our capstone in the Samsung Innovation Campus AI program, run with Yeşilay. We use the public AwareMind study, in which 37 Android users answered short check-ins during their phone sessions.",
        "Samsung Innovation Campus Yapay Zekâ programında Yeşilay ile yürüttüğümüz bitirme projesi. 37 Android kullanıcısının telefon oturumları sırasında kısa sorulara yanıt verdiği açık AwareMind çalışmasının verisini kullanıyoruz.",
      ),
      l(
        "The goal is to predict when someone wants to stop but is likely to keep going. When the model is confident, an opt-in Android prototype building on Eşik will offer one alternative the user picked in advance.",
        "Amaç, birinin bırakmak isteyip büyük olasılıkla devam edeceği anı önceden tahmin etmek. Model yeterince emin olduğunda, Eşik üzerine kurulacak isteğe bağlı bir Android prototipi kullanıcının önceden seçtiği tek bir alternatifi önerecek.",
      ),
    ],
    role: l(
      "I set up the group’s repository and put together our literature, data and technology review.",
      "Grubun deposunu kurdum ve literatür, veri ve teknoloji incelememizi derledim.",
    ),
    ledger: [
      {
        basis: l("First findings, 5,772 check-ins from 37 users", "İlk bulgular, 37 kullanıcıdan 5.772 yanıt"),
        rows: [
          { label: l("Check-ins where intention and use split", "Niyet ile kullanımın ayrıştığı yanıt"), after: l("14.9%", "%14,9") },
          {
            label: l("The same, midnight to 6 am", "Aynı oran, gece 00.00–06.00"),
            after: l("33.7%", "%33,7"),
            note: l("12.6% from 9 am to 6 pm", "09.00–18.00 arasında %12,6"),
          },
          {
            label: l("Kept going 5+ minutes after leaning “stop”", "“Bırak” yönünde yanıttan sonra 5 dakikadan uzun devam"),
            after: l("52.6%", "%52,6"),
            note: l("50.9% after leaning “continue”", "“Devam” yönünde yanıttan sonra %50,9"),
          },
        ],
      },
    ],
    stack: ["Python", "pandas", "NumPy", "Matplotlib"],
    links: [{ label: l("GitHub · group repository", "GitHub · grup deposu"), href: "https://github.com/edasaruhan/SIC_AI_18_Capstone_Group_6" }],
    figures: present([
      fig(
        "nudgewell/by-hour.webp",
        l(
          "Line chart of high-gap check-ins by hour of day: about 45% at 3 am, falling to around 10 to 15% during the day; the overall rate is 14.9%.",
          "Saate göre yüksek fark içeren yanıtların çizgi grafiği: gece 3’te yaklaşık %45, gündüz %10–15 civarı; genel oran %14,9.",
        ),
        l("High-gap check-ins by hour, with a 95% confidence band.", "Saate göre yüksek fark içeren yanıtlar (%95 güven aralığıyla)."),
      ),
      fig(
        "nudgewell/said-vs-did.webp",
        l(
          "Two charts: answers to the check-in on a 1 to 10 scale, 28% leaning stop and 72% leaning continue; and minutes of phone use after answering, with a median of 5.1 minutes.",
          "İki grafik: 1–10 ölçeğinde verilen yanıtlar (%28 bırakma, %72 devam yönünde) ve yanıttan sonraki telefon kullanım süresi (medyan 5,1 dakika).",
        ),
        l("Left: how people answered. Right: how long they kept using the phone afterwards.", "Solda: kullanıcıların yanıtları. Sağda: yanıttan sonra telefonu ne kadar kullanmaya devam ettikleri."),
      ),
    ]),
  },
  {
    id: "ratemygig",
    lane: "builds",
    kicker: l("Personal project · Dec 2025 – now", "Kişisel proje · Ara 2025 – devam ediyor"),
    status: l(
      "In development: the preview runs, but the event data and some screens are not finished.",
      "Geliştirme aşamasında: önizleme çalışıyor ama etkinlik verisi ve bazı ekranlar henüz bitmedi.",
    ),
    title: l("RateMyGig: a diary for concerts", "RateMyGig: konserler için bir günlük"),
    pitch: l("Find concerts, log the ones you went to and review the show.", "Konserleri bul, gittiklerini kaydet ve gösteriyi değerlendir."),
    body: [
      l(
        "A full-stack web app I am building on my own. The front end is React 19 and TypeScript; Supabase provides the PostgreSQL database, sign-in and photo storage.",
        "Tek başıma geliştirdiğim tam yığın bir web uygulaması. Ön yüz React 19 ve TypeScript ile yazıldı; PostgreSQL veritabanı, giriş ve fotoğraf depolama Supabase üzerinde.",
      ),
      l(
        "A scheduled GitHub Actions job pulls new events from the Ticketmaster API every night. Reviews can carry a rating, photos and a setlist, and each one gets a public share page.",
        "Zamanlanmış bir GitHub Actions işi her gece Ticketmaster API’sinden yeni etkinlikleri çekiyor. Değerlendirmelere puan, fotoğraf ve şarkı listesi eklenebiliyor; her birinin paylaşılabilir bir sayfası var.",
      ),
    ],
    role: l("All of it: design, front end, database and data pipeline.", "Tamamı: tasarım, ön yüz, veritabanı ve veri akışı."),
    ledger: [
      {
        basis: l("Repository, October 2026", "Depo, Ekim 2026"),
        rows: [
          { label: l("Automated tests", "Otomatik test"), after: "481" },
          { label: l("Database migrations", "Veritabanı migrasyonu"), after: "18" },
          { label: l("Nightly event imports, 15–19 Oct", "Gece etkinlik aktarımları, 15–19 Ekim"), after: l("5 / 5 passed", "5 / 5 başarılı") },
        ],
      },
    ],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "Supabase", "PostgreSQL", "Vitest", "Playwright", "GitHub Actions"],
    links: [
      { label: "GitHub · ratemygig", href: "https://github.com/Thynatos/ratemygig" },
      { label: l("Live preview", "Canlı önizleme"), href: "https://ratemygig-web.vercel.app" },
    ],
    figures: present([
      fig(
        "ratemygig/home.webp",
        l(
          "RateMyGig discovery page with a city filter, a search box and concert cards; the preview still shows seed events marked past.",
          "Şehir filtresi, arama kutusu ve konser kartlarıyla RateMyGig keşif sayfası; önizleme hâlâ geçmiş olarak işaretli örnek etkinlikler gösteriyor.",
        ),
        l("Discovery by city. The preview still runs on seed data.", "Şehre göre keşif. Önizleme hâlâ örnek veriyle çalışıyor."),
      ),
      fig(
        "ratemygig/event.webp",
        l(
          "A RateMyGig concert page with date, venue, ticket link, lineup and buttons to mark the gig as attended.",
          "Tarih, mekân, bilet bağlantısı, sahne listesi ve konsere gidildi olarak işaretleme düğmeleriyle bir RateMyGig konser sayfası.",
        ),
        l("A concert page: mark it attended, then review it.", "Konser sayfası: gidildi olarak işaretle, sonra değerlendir."),
      ),
    ]),
  },
];

/* ---------------------------------------------------------------- studies */

const step = {
  problem: l("Problem", "Problem"),
  model: l("Model", "Model"),
  method: l("Method", "Yöntem"),
  result: l("Result", "Sonuç"),
};

export const studiesSection = {
  label: l("Studies", "Çalışmalar"),
  title: l("Course projects, from problem to result", "Ders projeleri, problemden sonuca"),
  intro: l(
    "Smaller pieces of work, each written up the same way: the problem, the model, the method and what came out. Open a row to read it.",
    "Daha küçük çalışmalar; her biri aynı şekilde yazıldı: problem, model, yöntem ve sonuç. Okumak için bir satırı açın.",
  ),
};

export const studies: Study[] = [
  {
    id: "study-coldchain",
    course: "IE 479",
    year: "2025",
    title: l("Emergency cold chain for 40 cities", "40 il için acil soğuk zincir ağı"),
    methods: l("p-center MIP · Clarke-Wright · 2-opt · location-routing", "p-merkez MIP · Clarke-Wright · 2-opt · konum-rotalama"),
    headline: l("Longest delivery 27.1 → 19.4 h", "En uzun teslimat 27,1 → 19,4 sa"),
    team: l("Team of 3", "3 kişilik ekip"),
    steps: [
      {
        label: step.problem,
        text: l(
          "Vaccines and blood products are collected at local depots in 40 cities and must reach any other city fast. Four hubs are to be opened, chosen from 12 candidate cities.",
          "Aşı ve kan ürünleri 40 ildeki yerel depolarda toplanıyor ve diğer illere hızla ulaşmalı. 12 aday il arasından dört merkez açılacak.",
        ),
      },
      {
        label: step.model,
        text: l(
          "A p-center MIP picks the hubs that minimize the longest depot-to-hub trip. A small squared-distance term breaks ties toward compact clusters, which makes the routing step easier.",
          "Bir p-merkez MIP modeli, en uzun depo–merkez yolculuğunu en aza indiren merkezleri seçiyor. Küçük bir mesafe-kare terimi eşitlikleri derli toplu kümeler lehine bozuyor; bu da rotalamayı kolaylaştırıyor.",
        ),
      },
      {
        label: step.method,
        text: l(
          "Each hub’s routes are solved exactly where the MIP is fast enough, and with Clarke-Wright savings plus 2-opt where it is not, under a 12-hour shift limit. Then location and routing are solved together under an 8-hour limit.",
          "Her merkezin rotaları MIP yeterince hızlıysa kesin olarak, değilse Clarke-Wright tasarruf yöntemi ve 2-opt ile, 12 saatlik vardiya sınırı altında çözülüyor. Sonra konum ve rotalama 8 saatlik sınırla birlikte çözülüyor.",
        ),
      },
      {
        label: step.result,
        text: l(
          "The sequential design needs 7 trucks (hubs in Adana, Ankara, Kocaeli and Muğla). Solving location and routing together cuts the longest delivery from 27.1 to 19.4 hours, but it needs 15 trucks.",
          "Sıralı tasarım 7 araçla çalışıyor (merkezler Adana, Ankara, Kocaeli ve Muğla’da). Konum ve rotalamayı birlikte çözmek en uzun teslimatı 27,1 saatten 19,4 saate indiriyor, ancak 15 araç gerektiriyor.",
        ),
      },
    ],
    figure: fig(
      "studies/coldchain-routes.webp",
      l(
        "Map of Türkiye with four hub clusters and seven truck routes drawn in four colours.",
        "Dört merkez kümesi ve dört renkte çizilmiş yedi araç rotasıyla Türkiye haritası.",
      ),
      l("Sequential design: 7 trucks from 4 hubs, 6,357 km in total.", "Sıralı tasarım: 4 merkezden 7 araç, toplam 6.357 km."),
    ),
    links: [],
  },
  {
    id: "study-umke",
    course: "IE 479",
    year: "2025",
    title: l("Field hospital locations for UMKE", "UMKE için sahra sağlık tesisi yerleri"),
    methods: l("Set covering · maximum coverage · p-median", "Küme örtme · maksimum kapsama · p-medyan"),
    headline: l("4 sites reach every district from 3 km", "4 tesis 3 km’den itibaren tüm ilçeleri kapsıyor"),
    team: l("Team of 3", "3 kişilik ekip"),
    steps: [
      {
        label: step.problem,
        text: l(
          "UMKE, Türkiye’s national medical rescue team, needs field health facilities placed so that all 20 affected districts are within a medical service radius.",
          "Ulusal Medikal Kurtarma Ekibi UMKE’nin sahra sağlık tesislerini, etkilenen 20 ilçenin tamamı bir hizmet yarıçapı içinde kalacak şekilde yerleştirmesi gerekiyor.",
        ),
      },
      {
        label: step.model,
        text: l(
          "Three views of one decision: set covering (fewest sites that reach everyone), maximum coverage (most people reached with at most 4 sites) and p-median with a coverage limit (shortest total distance).",
          "Aynı karara üç bakış: küme örtme (herkese ulaşan en az tesis), maksimum kapsama (en fazla 4 tesisle ulaşılan en çok kişi) ve kapsama sınırlı p-medyan (en kısa toplam mesafe).",
        ),
      },
      {
        label: step.method,
        text: l(
          "Each model is solved for service radii from 2 to 6 km, to show the trade-off between the number of sites and the distance people travel.",
          "Tesis sayısı ile insanların gideceği mesafe arasındaki ödünleşimi görmek için her model 2–6 km hizmet yarıçapları için çözülüyor.",
        ),
      },
      {
        label: step.result,
        text: l(
          "Full coverage needs 5 sites at 2 km but only 3 at 3 km. With 4 sites, coverage is 92.9% at 2 km and 100% from 3 km on, and the same four districts stay optimal from 3 to 6 km.",
          "Tam kapsama 2 km’de 5 tesis, 3 km’de ise yalnızca 3 tesis gerektiriyor. 4 tesisle kapsama 2 km’de %92,9, 3 km’den itibaren %100; 3–6 km arasında aynı dört ilçe en iyi çözüm olarak kalıyor.",
        ),
      },
    ],
    chart: "umke-coverage",
    links: [],
  },
  {
    id: "study-ubereats",
    course: "IE 469",
    year: "2025",
    title: l("Driver allocation for Uber Eats in Manhattan", "Manhattan’da Uber Eats için kurye dağıtımı"),
    methods: l("Binary LP · Excel Solver · VBA · Leaflet", "İkili LP · Excel Solver · VBA · Leaflet"),
    headline: l("Model setup from minutes to seconds", "Model kurulumu dakikalardan saniyelere"),
    team: l("Group project", "Grup projesi"),
    steps: [
      {
        label: step.problem,
        text: l(
          "Late deliveries often come from drivers waiting in the wrong place. With 500 drivers, how many should wait in each of Manhattan’s 32 neighbourhoods, and how far should each one serve?",
          "Gecikmeli teslimatların önemli bir nedeni kuryelerin yanlış yerde beklemesi. 500 kurye Manhattan’ın 32 mahallesine nasıl dağıtılmalı ve her mahalle ne kadar uzağa hizmet vermeli?",
        ),
      },
      {
        label: step.model,
        text: l(
          "A binary LP chooses one of five coverage radii for each neighbourhood, with effective demand growing with the square of coverage. Drivers left over after the minimum plan are spread in proportion to hourly demand.",
          "İkili bir LP modeli her mahalle için beş kapsama yarıçapından birini seçiyor; etkin talep kapsamanın karesiyle artıyor. Asgari plandan artan kuryeler saatlik talebe orantılı dağıtılıyor.",
        ),
      },
      {
        label: step.method,
        text: l(
          "VBA modules compute neighbourhood centroids with the shoelace formula and Manhattan distances to restaurants, and cache them so the model does not rebuild its inputs on every run.",
          "VBA modülleri mahalle merkezlerini shoelace formülüyle, restoranlara uzaklıkları Manhattan mesafesiyle hesaplıyor ve önbelleğe alıyor; böylece model her çalıştırmada girdilerini yeniden kurmuyor.",
        ),
      },
      {
        label: step.result,
        text: l(
          "Caching cut model setup from minutes to seconds. An Excel form takes the number of drivers and shows the allocation on an interactive Leaflet map.",
          "Önbellekleme model kurulumunu dakikalardan saniyelere indirdi. Bir Excel formu kurye sayısını alıp dağıtımı etkileşimli bir Leaflet haritasında gösteriyor.",
        ),
      },
    ],
    figure: fig(
      "studies/ubereats-map.webp",
      l(
        "Leaflet map of Manhattan with one coverage circle per neighbourhood, coloured by the number of drivers assigned: 15 or more, 10 to 14, 5 to 9, or fewer than 5.",
        "Manhattan’ın Leaflet haritası; her mahalle için bir kapsama dairesi, atanan kurye sayısına göre renklendirilmiş: 15 ve üzeri, 10–14, 5–9 ya da 5’ten az.",
      ),
      l("The allocation map the Excel tool opens: circle size is coverage, colour is drivers.", "Excel aracının açtığı dağıtım haritası: daire boyutu kapsamayı, renk kurye sayısını gösteriyor."),
    ),
    links: [],
  },
  {
    id: "study-sac",
    course: "CS 461",
    year: "2026",
    title: l("A robot arm that learns from sparse rewards", "Seyrek ödülle öğrenen robot kol"),
    methods: l("SAC · HER · PyTorch · Gymnasium-Robotics", "SAC · HER · PyTorch · Gymnasium-Robotics"),
    headline: l("100% success in 100 test runs", "100 test denemesinde %100 başarı"),
    team: l("Course assignment", "Ders ödevi"),
    steps: [
      {
        label: step.problem,
        text: l(
          "In FetchReach-v4 a simulated arm gets a reward of −1 at every step until its hand reaches the target. Almost every random attempt fails, so there is very little to learn from.",
          "FetchReach-v4 ortamında simüle bir kol, eli hedefe ulaşana kadar her adımda −1 ödül alıyor. Rastgele denemelerin neredeyse hepsi başarısız olduğu için öğrenecek çok az sinyal var.",
        ),
      },
      {
        label: step.model,
        text: l(
          "Soft Actor-Critic with Hindsight Experience Replay, which relabels a failed attempt with the goal the arm actually reached, so every attempt teaches something.",
          "Hindsight Experience Replay ile Soft Actor-Critic: başarısız bir denemeyi kolun gerçekte ulaştığı hedefle yeniden etiketliyor, böylece her deneme bir şey öğretiyor.",
        ),
      },
      {
        label: step.method,
        text: l(
          "The course provided the critics, the replay buffer and the training loop. I implemented the actor, a Gaussian policy with the reparameterization trick and the tanh log-probability correction, trained it for 10,000 episodes and ran three one-change ablations.",
          "Eleştirmen ağları, tekrar arabelleği ve eğitim döngüsü dersle birlikte hazır geldi. Ben aktörü yazdım: yeniden parametrelendirme ve tanh log-olasılık düzeltmesi içeren bir Gauss politikası. Ardından 10.000 bölüm eğittim ve tek değişkenli üç ablasyon deneyi yaptım.",
        ),
      },
      {
        label: step.result,
        text: l(
          "The trained agent reached the target in all 100 evaluation runs (average reward −2.39). A 10× lower learning rate stopped learning entirely, and a higher entropy weight left the arm moving randomly near the target.",
          "Eğitilen ajan 100 değerlendirme denemesinin hepsinde hedefe ulaştı (ortalama ödül −2,39). On kat düşük öğrenme oranı öğrenmeyi tamamen durdurdu; daha yüksek entropi ağırlığı ise kolun hedef yakınında rastgele hareket etmesine yol açtı.",
        ),
      },
    ],
    figure: fig(
      "studies/sac-learning-curve.webp",
      l(
        "Learning curve over 10,000 episodes: evaluation reward stays near −50 until about episode 4,000, then climbs to about −2.4 by episode 7,000.",
        "10.000 bölümlük öğrenme eğrisi: değerlendirme ödülü yaklaşık 4.000. bölüme kadar −50 civarında kalıyor, 7.000. bölümde yaklaşık −2,4’e çıkıyor.",
      ),
      l("Evaluation reward (green) and training reward over 10,000 episodes.", "10.000 bölüm boyunca değerlendirme (yeşil) ve eğitim ödülü."),
    ),
    links: [{ label: "GitHub · sac-her-fetchreach", href: "https://github.com/Thynatos/sac-her-fetchreach" }],
  },
];

export const umkeChart = {
  title: l("Sites needed for full coverage, by service radius", "Tam kapsama için gereken tesis, hizmet yarıçapına göre"),
  coverageTitle: l("Coverage with at most 4 sites", "En fazla 4 tesisle kapsama"),
  radiusLabel: l("Radius", "Yarıçap"),
  rows: [
    { r: 2, sites: 5, coverage: 92.9 },
    { r: 3, sites: 3, coverage: 100 },
    { r: 4, sites: 2, coverage: 100 },
    { r: 5, sites: 1, coverage: 100 },
    { r: 6, sites: 1, coverage: 100 },
  ],
};

export const buildsSection = {
  title: l("Also built", "Diğer projeler"),
  items: [
    {
      name: "Randevu Türkiye",
      text: l(
        "Appointment marketplace for service businesses in Türkiye: customer, provider and admin apps on a NestJS API with PostgreSQL/PostGIS, Meilisearch and an iyzico sandbox. Private repository, in development.",
        "Türkiye’deki hizmet işletmeleri için randevu pazaryeri: NestJS API üzerinde müşteri, işletme ve yönetici uygulamaları (PostgreSQL/PostGIS, Meilisearch, iyzico test ortamı). Özel depo, geliştirme aşamasında.",
      ),
    },
    {
      name: "ReelNotes",
      text: l("A film diary app prototype in React Native and Expo.", "React Native ve Expo ile film günlüğü uygulaması prototipi."),
    },
    {
      name: "Dice Throne Reference",
      text: l(
        "A quick-reference web app for the heroes of the Dice Throne Marvel board game.",
        "Dice Throne Marvel kutu oyunundaki kahramanlar için hızlı başvuru web uygulaması.",
      ),
      link: { label: l("Open", "Aç"), href: "https://dicethrone-reference.vercel.app" },
    },
  ] as Build[],
};

/* ------------------------------------------------------------- experience */

export const experienceSection = {
  label: l("Experience", "Deneyim"),
  title: l("Where I have worked", "Çalıştığım yerler"),
  see: l("Read the project", "Projeyi okuyun"),
};

export const roles: Role[] = [
  {
    id: "exp-bobaco",
    org: "Nesco Gıda İçecek (BobaCo)",
    title: l("Project Engineer (Senior Design)", "Proje Mühendisi (Bitirme Projesi)"),
    dates: l("Oct 2025 – Jun 2026", "Eki 2025 – Haz 2026"),
    place: l("Ankara, Türkiye", "Ankara"),
    points: [
      l(
        "Built the production planning system above with a team of seven, as our senior design project with the company.",
        "Yukarıdaki üretim planlama sistemini, şirketle yürüttüğümüz bitirme projesi olarak yedi kişilik bir ekiple geliştirdim.",
      ),
      l(
        "Worked directly with plant operators to fix misconfigured inputs and resolve conflicting constraints.",
        "Hatalı girilen verileri düzeltmek ve çelişen kısıtları çözmek için doğrudan fabrika operatörleriyle çalıştım.",
      ),
    ],
    see: { label: l("Production planning for BobaCo", "BobaCo için üretim planlama"), href: "#tcotz" },
  },
  {
    id: "exp-kontrolmatik",
    org: "Kontrolmatik Teknoloji",
    title: l("Quality Management Intern", "Kalite Yönetimi Stajyeri"),
    dates: l("Aug – Sep 2025", "Ağu – Eyl 2025"),
    place: l("İstanbul, Türkiye", "İstanbul"),
    points: [
      l(
        "Audited ISO 9001 quality records (inspection test plans, checklists and factory acceptance tests) for large energy infrastructure projects, and flagged documentation gaps.",
        "Büyük enerji altyapısı projeleri için ISO 9001 kalite kayıtlarını (muayene ve test planları, kontrol listeleri, fabrika kabul testleri) denetledim ve dokümantasyon eksiklerini raporladım.",
      ),
    ],
  },
  {
    id: "exp-jeton",
    org: "Jeton Digital",
    title: l("Data Engineering Intern", "Veri Mühendisliği Stajyeri"),
    dates: l("May – Aug 2025", "May – Ağu 2025"),
    place: l("Harpenden, England (remote)", "Harpenden, İngiltere (uzaktan)"),
    points: [
      l(
        "Built SQL and Python (pandas) pipelines that automated weekly stakeholder reports from interview datasets.",
        "Görüşme veri setlerinden haftalık paydaş raporlarını otomatikleştiren SQL ve Python (pandas) veri akışları kurdum.",
      ),
    ],
  },
  {
    id: "exp-botas",
    org: "BOTAŞ",
    title: l("Data Engineering Intern", "Veri Mühendisliği Stajyeri"),
    dates: l("Aug – Sep 2024", "Ağu – Eyl 2024"),
    place: l("Ankara, Türkiye", "Ankara"),
    points: [
      l(
        "Formulated Gurobi and Excel Solver models for resource allocation under real energy demand forecasts.",
        "Gerçek enerji talep tahminleri altında kaynak tahsisi için Gurobi ve Excel Solver modelleri kurdum.",
      ),
      l("Automated demand forecasting pipelines in SAS.", "SAS ile talep tahmini akışlarını otomatikleştirdim."),
    ],
  },
  {
    id: "exp-inovako",
    org: "INOVAKO",
    title: l("Data Processing Intern", "Veri İşleme Stajyeri"),
    dates: l("Jul – Aug 2024", "Tem – Ağu 2024"),
    place: l("Vitoria-Gasteiz, Spain (remote)", "Vitoria-Gasteiz, İspanya (uzaktan)"),
    points: [
      l(
        "Annotated and preprocessed more than 2,000 images for industrial object detection and defect classification models (Roboflow, MakeSense).",
        "Endüstriyel nesne tespiti ve kusur sınıflandırma modelleri için 2.000’den fazla görüntüyü etiketleyip ön işledim (Roboflow, MakeSense).",
      ),
    ],
  },
];

export const education = {
  id: "education",
  title: l("B.S. Industrial Engineering", "Endüstri Mühendisliği Lisans"),
  org: l("Bilkent University", "Bilkent Üniversitesi"),
  dates: l("Sep 2022 – Jun 2026", "Eyl 2022 – Haz 2026"),
  place: l("Ankara, Türkiye", "Ankara"),
  points: [
    l(
      "ALES quantitative 93.9 / 100, top 0.2% (Türkiye’s national graduate entrance exam).",
      "ALES sayısal 93,9 / 100, ilk %0,2.",
    ),
    l(
      "Selected courses: Distribution Logistics, Industrial Applications of OR, Production Information Systems, Pricing and Revenue Optimization, Applied Data Analysis, Artificial Intelligence, Simulation.",
      "Seçili dersler: Dağıtım Lojistiği, Yöneylem Araştırmasının Endüstriyel Uygulamaları, Üretim Bilgi Sistemleri, Fiyatlandırma ve Gelir Optimizasyonu, Uygulamalı Veri Analizi, Yapay Zekâ, Benzetim.",
    ),
  ],
};

/* ------------------------------------------------------------------ awards */

export const awardsSection = {
  label: l("Awards and programs", "Ödüller ve programlar"),
  title: l("Results, programs and the rest", "Sonuçlar, programlar ve diğerleri"),
  groups: {
    awards: l("Awards", "Ödüller"),
    programs: l("Programs", "Programlar"),
    volunteering: l("Volunteering and clubs", "Gönüllülük ve kulüpler"),
  },
};

export const awards: AwardItem[] = [
  {
    title: l("1st place", "Birincilik"),
    org: l(
      "Samsung Innovation Campus GenAI hackathon on digital addiction and well-being",
      "Samsung Innovation Campus dijital bağımlılık ve iyi oluş temalı üretken yapay zekâ hackathonu",
    ),
    date: l("Aug 2026", "Ağu 2026"),
    note: l("With Eşik", "Eşik ile"),
    href: "#esik",
  },
  {
    title: l("2nd place", "İkincilik"),
    org: l("Sabancı University Optimization Challenge 2026", "Sabancı Üniversitesi Optimizasyon Yarışması 2026"),
    date: l("May 2026", "May 2026"),
    note: l("Risk-aware dynamic routing", "Risk odaklı dinamik rotalama"),
    href: "#sabanci",
  },
  {
    title: l("3rd place", "Üçüncülük"),
    org: l("Bilkent University 24th Industry-Oriented Project Competition", "Bilkent Üniversitesi 24. Sanayi Odaklı Proje Yarışması"),
    date: l("Jun 2026", "Haz 2026"),
    note: l("With the BobaCo planner", "BobaCo planlama sistemiyle"),
    href: "#tcotz",
  },
];

export const programs: AwardItem[] = [
  {
    title: l("Samsung Innovation Campus, AI program (cohort 18)", "Samsung Innovation Campus Yapay Zekâ programı (18. dönem)"),
    date: l("Aug 2026 – now", "Ağu 2026 – devam ediyor"),
    note: l(
      "Samsung and UNDP Türkiye’s AI training. Our capstone with Yeşilay is NudgeWell.",
      "Samsung ve UNDP Türkiye’nin yapay zekâ eğitimi. Yeşilay ile yürüttüğümüz bitirme projemiz NudgeWell.",
    ),
    href: "#nudgewell",
  },
  {
    title: l("Erasmus+ youth exchange", "Erasmus+ gençlik değişimi"),
    date: l("Jun 2025", "Haz 2025"),
    note: l(
      "International sustainability program, Green Lives Foundation, Primorsko, Bulgaria.",
      "Uluslararası sürdürülebilirlik programı, Green Lives Foundation, Primorsko, Bulgaristan.",
    ),
  },
];

export const volunteering: AwardItem[] = [
  {
    title: l("Barrier-Free Cerebral Palsy Sports Club, volunteer", "Engelsiz Serebral Palsi Spor Kulübü, gönüllü"),
    date: l("2022 – now", "2022 – devam ediyor"),
    note: l(
      "Training and competing in boccia and paravolley alongside people with cerebral palsy.",
      "Serebral palsili sporcularla birlikte boccia ve paravoley antrenmanları ve müsabakaları.",
    ),
  },
  {
    title: l("Bilkent Environment and Sustainability Society, executive board", "Bilkent Çevre ve Sürdürülebilirlik Topluluğu, yönetim kurulu"),
    date: l("2024 – 2026", "2024 – 2026"),
  },
  {
    title: l("Bilkent Photography Club, executive board (finance)", "Bilkent Fotoğraf Kulübü, yönetim kurulu (finans)"),
    date: "2026",
  },
];

/* ------------------------------------------------------------------ skills */

const W = {
  tcotz: { label: "BobaCo", href: "#tcotz" },
  sabanci: { label: "Sabancı", href: "#sabanci" },
  esik: { label: "Eşik", href: "#esik" },
  nudgewell: { label: "NudgeWell", href: "#nudgewell" },
  ratemygig: { label: "RateMyGig", href: "#ratemygig" },
  coldchain: { label: l("IE 479 cold chain", "IE 479 soğuk zincir"), href: "#study-coldchain" },
  umke: { label: "IE 479 UMKE", href: "#study-umke" },
  ubereats: { label: "IE 469", href: "#study-ubereats" },
  sac: { label: "CS 461", href: "#study-sac" },
  botas: { label: "BOTAŞ", href: "#exp-botas" },
  jeton: { label: "Jeton", href: "#exp-jeton" },
  inovako: { label: "INOVAKO", href: "#exp-inovako" },
};

export const skillsSection = {
  label: l("Skills", "Yetkinlikler"),
  title: l("Skills, with where I used them", "Yetkinlikler ve kullandığım yerler"),
  intro: l(
    "Read it like a where-used list in a bill of materials: each skill points to the work that shows it.",
    "Bir ürün ağacındaki “nerede kullanılır” listesi gibi okuyun: her yetkinlik onu gösteren işe bağlanıyor.",
  ),
  tools: {
    label: l("Also", "Ayrıca"),
    text: l("Git, LaTeX, Excel, SAP S/4HANA, Roboflow", "Git, LaTeX, Excel, SAP S/4HANA, Roboflow"),
  },
  languages: {
    label: l("Languages", "Diller"),
    text: l("Turkish (native) · English (IELTS 8.0) · German (A1)", "Türkçe (ana dil) · İngilizce (IELTS 8.0) · Almanca (A1)"),
  },
};

export const skills: SkillGroup[] = [
  {
    name: l("Optimization", "Optimizasyon"),
    rows: [
      { name: l("Mixed-integer and linear programming", "Karma tamsayılı ve doğrusal programlama"), where: [W.tcotz, W.sabanci, W.coldchain, W.umke, W.ubereats] },
      { name: l("Stochastic programming, rolling horizon", "Stokastik programlama, kayan ufuk"), where: [W.tcotz] },
      { name: l("Heuristics: ALNS, Clarke-Wright, 2-opt", "Sezgiseller: ALNS, Clarke-Wright, 2-opt"), where: [W.sabanci, W.coldchain] },
      { name: l("Solvers: PuLP, HiGHS, Gurobi, Excel Solver", "Çözücüler: PuLP, HiGHS, Gurobi, Excel Solver"), where: [W.tcotz, W.sabanci, W.coldchain, W.ubereats, W.botas] },
    ],
  },
  {
    name: l("Data", "Veri"),
    rows: [
      { name: "Python (pandas, NumPy)", where: [W.tcotz, W.sabanci, W.nudgewell, W.jeton] },
      { name: "SQL", where: [W.jeton, W.ratemygig] },
      { name: "SAS", where: [W.botas] },
      { name: "R", where: [{ label: l("IE 451 coursework", "IE 451 dersi") }] },
      { name: l("Forecasting and scenario generation", "Tahmin ve senaryo üretimi"), where: [W.tcotz, W.botas] },
      { name: l("Visualization: Matplotlib, Leaflet", "Görselleştirme: Matplotlib, Leaflet"), where: [W.nudgewell, W.ubereats, W.coldchain] },
    ],
  },
  {
    name: l("Machine learning and AI", "Makine öğrenmesi ve yapay zekâ"),
    rows: [
      { name: l("PyTorch, deep reinforcement learning", "PyTorch, derin pekiştirmeli öğrenme"), where: [W.sac] },
      { name: l("LLM output checks and fallbacks (Gemini)", "LLM çıktı denetimi ve yedek akışlar (Gemini)"), where: [W.esik] },
      { name: l("Image annotation for computer vision", "Bilgisayarlı görü için görüntü etiketleme"), where: [W.inovako] },
    ],
  },
  {
    name: l("Software", "Yazılım"),
    rows: [
      { name: "Streamlit", where: [W.tcotz] },
      { name: "React, TypeScript, Supabase", where: [W.ratemygig] },
      { name: "Kotlin, Jetpack Compose", where: [W.esik] },
      { name: l("Testing and CI: Vitest, Playwright, GitHub Actions", "Test ve CI: Vitest, Playwright, GitHub Actions"), where: [W.ratemygig, W.esik] },
      { name: "Excel VBA", where: [W.ubereats] },
    ],
  },
];

/* ----------------------------------------------------------------- contact */

export const contact = {
  label: l("Contact", "İletişim"),
  title: l("Contact", "İletişim"),
  text: l(
    "I am looking for graduate and entry-level roles in operations research, planning and data. Email is the quickest way to reach me.",
    "Yöneylem araştırması, planlama ve veri alanlarında yeni mezun ve giriş seviyesi pozisyonlarla ilgileniyorum. Bana en hızlı e-postayla ulaşabilirsiniz.",
  ),
  footer: l(
    "Built with Next.js. Set in Barlow Condensed, TeX Gyre Pagella and IBM Plex Mono.",
    "Next.js ile yapıldı. Yazı tipleri: Barlow Condensed, TeX Gyre Pagella ve IBM Plex Mono.",
  ),
  updatedLabel: l("Updated", "Güncelleme"),
};
