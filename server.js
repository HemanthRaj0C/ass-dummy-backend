import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const port = process.env.PORT

const photos = {
  "QUIZ_1.jpg": "jpg",
  "QUIZ_2.jpg": "jpg",
  "WEBINAR_1.jpg": "jpg",
  "WEBINAR_2.jpg": "jpg",
  "WORKSHOP_1.jpg": "jpg",
  "WORKSHOP_1.jpg": "jpg",
  "EP1.jpg": "jpg",
  "EP2.jpg": "jpg",
  "EP3.jpg": "jpg",
  "Sitharshan1.jpg": "jpg",
  "Sitharshan2.jpg": "jpg",
  "Sitharshan3.jpg": "jpg",
  "Sitharshan4.jpg": "jpg",
  "Linngesh.jpg": "jpg",
  "Akshaya.jpg": "jpg",
  "Kaviya.jpg": "jpg",
  "Vanathi.jpg": "jpg",
  "Binu.jpg": "jpg",
  "Guru.jpg": "jpg",
  "JayaKaran.jpg": "jpg",
  "Hemanth.jpg": "jpg",
  "Akshay.jpg": "jpg",
  "Vishal.jpg": "jpg",
  "Alwin.jpg": "jpg",
};
const events = {
  "1": {
    id: "1",
    name: "Quiz",
    participants: 100,
    date: "26-06-2024",
    photos: [
      "QUIZ_1.jpg",
      "QUIZ_2.jpg"
    ],
    registration_start: new Date(),
    location: "Online",
    min_team_size: 1,
    max_team_size: 1,
    description: "Quiz on cybersecurity basics tested participants' knowledge of key concepts such as malware types, phishing, firewalls, and encryption. Questions covered best practices for securing personal and organizational data, recognizing cyber threats, and implementing preventive measures. The interactive format encouraged engagement and reinforced fundamental cybersecurity principles. Scores were tallied, and top performers were recognized, providing a fun and educational experience for all involved.",
  },
  "2": {
    id: "2",
    name: "WEBINAR",
    participants: 200,
    date: "29-07-2024",
    registration_start: new Date(),
    location: "Online",
    min_team_size: 1,
    max_team_size: 1,
    photos: [
      "WEBINAR_1.jpg",
      "WEBINAR_2.jpg",
    ],
    description: "Webinar on Linux basics covered essential commands, file management, and permissions. Participants learned how to navigate the filesystem, use command-line tools, and handle user permissions. The session also introduced package management and basic shell scripting. Attendees gained hands-on experience through practical exercises, enhancing their understanding of Linux system administration. The webinar concluded with a Q&A session to address specific queries.",
  },
  "3": {
    id: "3",
    name: "WORKSHOP",
    participants: 100,
    date: "29-11-2024",
    registration_start: new Date(),
    location: "CIT Chennai",
    min_team_size: 1,
    max_team_size: 4,
    photos: [
      "WORKSHOP_1.jpg",
      "WORKSHOP_1.jpg",
    ],
    description: "The 'Beyond Your Organisation' workshop focused on enhancing cybersecurity skills. Attendees learned about advanced threat detection, incident response, and secure coding practices. The workshop emphasized the importance of proactive defense mechanisms and the latest cybersecurity trends. Participants engaged in hands-on activities, including network vulnerability assessments and simulated cyber-attacks. Expert speakers provided insights into real-world cyber threats and mitigation strategies, concluding with a Q&A session for in-depth discussions.",
  },
};

const podcasts = {
  "EP1": {
    id: "EP1",
    name: "Everyday Cybersecurity: Practical Tips for the Digital Era",
    publish: true,
    guests: ["Syed Suhail Ikraam, Cybersecurity Practitioner"],
    description: "In this episode, we're breaking down cybersecurity essentials! Discover why it's not for everyone and get a roadmap for ethical hacking, with a focus on mastering Linux OS. Packed with practical tips, this episode is a must-listen for anyone interested in cybersecurity! Tune in now!",
    image: "EP1.jpg",
    mime: "mp3",
    spotify: "https://open.spotify.com/episode/0ZMwdwTLYCyAtFK3gqun3R?si=60bd2edd73f34c5a"
  },
  "EP2": {
    id: "EP2",
    name: "Unveiling Cyber Threats: Defensive Strategies with Vignesh Sir",
    publish: true,
    guests: ["Vignesh Sir, CEO of CyberXtron"],
    description: "Join Vignesh Sir, CEO of CyberXtron, in the first episode of our podcast series as we delve into essential defensive strategies against cyber threats. Discover proactive measures, best practices, and insights on staying ahead in the dynamic world of cybersecurity.",
    image: "EP2.jpg",
    mime: "mp3",
    spotify: "https://open.spotify.com/episode/2xc30vPB1UHp5AdWiiJwaA?si=cSXluBf9Rgey0NXQFf9g6w"
  },
  "EP3": {
    id: "EP3",
    name: "Cybersecurity Roadmap Unlocked:Your Ultimate Guide to Success!",
    publish: true,
    guests: ["Rakesh Sir"],
    description: "Ready to crack the code on cybersecurity? Join Rakesh Sir on this high-voltage episode of Syntax Stories! In Part 1, get the inside scoop on their journey, must-have certifications, and standout projects. Discover why hackathons are your secret weapon and what makes you a top hire. Tune in and kickstart your journey to cybersecurity stardom!",
    image: "EP3.jpg",
    mime: "mp3",
    spotify: "https://open.spotify.com/episode/7actC0aaJZpDpn4INXaRMP?si=8w7V0n44Ri6uVBrWzOs2cg"
  },
};

const members = {
  "1": {
    id: "1",
    name: "SITHARSHAN",
    role: "President",
    photos: [
      "Sitharshan1.jpg",
      "Sitharshan2.jpg",
      "Sitharshan3.jpg",
      "Sitharshan4.jpg"
    ],
    description: "I'm a tech wizard with a passion for C++ (the supreme language, obviously) and an undying love for cybersecurity. Most of my time is split between battling malware like a digital gladiator and spending quality moments with my girlfriend, who somehow puts up with my nerdy rants. As the self-proclaimed supreme leader of my team, I excel at pushing them to their limits—usually by making them work so hard they question their life choices (all in good spirit, of course). Chaos, code, and a little bit of romance—that's how I roll!",
    portfolio: "I don't have one",
    energySource: "Pepsi, Snickers, Podcast, Linux",
    dimension: "1920 x 1080",
    type: "Girlzzzz",
    hobbiesInstalled: "Malware Building, Team Torturing",
    specialFeatures: "Code, Command, Conquer (with a side of caffeine-induced evil laughter)"
  },
  "2": {
    id: "2",
    name: "LINNGESHWAR B",
    role: "Vice President",
    photos: [
      "Linngesh.jpg"
    ],
    description: "I'm a teleportation connoisseur trapped in a world that insists on walking coz why settle for ordinary when you can dream extraordinary? At 6 feet (copium), my life runs on video games, mountains of food, and sitcom reruns that work better than any therapy. If it were a TV show, it'd be a comedy where my love handles steal the spotlight. Chaos, cravings, and attempts at clever comebacks that fail miserably but hey this is just another day in the world of linngesh!",
    portfolio: "I don't have one",
    energySource: "Good Chocolate cake, rom-coms, AAA battery ,procrastination fuel",
    dimension: "The friend zone",
    type: "Tall sum/total XX",
    hobbiesInstalled: "Mining and crafting, snack hunting, coding",
    specialFeatures: "Will gladly follow the crowd, as long as the destination has snacks"
  },
  "3": {
    id: "3",
    name: "AKSHAYA",
    role: "Secretary",
    photos: [
      "Akshaya.jpg"
    ],
    description: "I'm like the mitochondria of the team—small, kinda useless, but somehow managing to stay around. I can follow instructions to perfection (if I don't get distracted by snacks) and try my best to add some cheer to everything, even if it's just by being the awkward one in the room. My dedication is only rivaled by my ability to procrastinate, making me the go-to person for doing things... eventually. But hey, at least I try!",
    portfolio: "I don't have one",
    energySource: "Sweet Treats and Endless Cups of Tea (mostly to stay awake)",
    dimension: "1920 x 1080",
    type: "Straight (but don't expect much)",
    hobbiesInstalled: "Helping when I remember, laughing awkwardly, and Spreading Mediocrity",
    specialFeatures: "Support, Smile, Succeed (with a lot of hesitation)"
  },
  "4": {
    id: "4",
    name: "KAVIYA SREE",
    role: "Secretary",
    photos: [
      "Kaviya.jpg"
    ],
    description: "A creative mind with a knack for innovation and a love for making ideas come to life. Standing at 5'1” (without heels), I blend curiosity with a practical approach to exploring the world around me. Whether  diving into books or watching movies(my escape to different worlds),I enjoy both the quiet moments and vibrant company.",
    portfolio: "I don't have one",
    energySource: "Random bursts of inspiration, good food, and quiet moments",
    dimension: "Ambivert in 4K resolution",
    type: "Quietly curious, with a spark of spontaneity",
    hobbiesInstalled: "Reading (but not too much), exploring new perspectives, and occasional deep dives into random topics",
    specialFeatures: "Ambivert switch ,masterful laugher (error rate: 10%) , a dependable listener, and excellent snack selection skills"
  },
  "5": {
    id: "5",
    name: "VANATHI",
    role: "Chief Coordinator",
    photos: [
      "Vanathi.jpg"
    ],
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}"
  },
  "6": {
    id: "6",
    name: "BINU",
    role: "Hiring Manager",
    photos: [
      "Binu.jpg"
    ],
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}"
  },
  "7": {
    id: "7",
    name: "GURU",
    role: "CCO",
    photos: [
      "Guru.jpg"
    ],
    description: "Guru - standing tall at 5'8” (with shoes on), weighing a precise 69 kg, and carrying the charm of someone who's been battling migraines since childhood yet keeps experimenting with life. I  embody the spirit of a 'jack of all trades' in the making. Whether it's dabbling in new hobbies or mastering skills, and also am on a relentless quest to unlock my potential with a side of humor and grit.",
    portfolio: "I don't have one",
    energySource: "Eggs , Caffeine, and Sheer Determination",
    dimension: "David Laid but 1080p",
    type: "just a Chill Guy",
    hobbiesInstalled: "Jack-of-all-trades beta testing",
    specialFeatures: "Migraine , Huge Biceps , knows Java , Bad Memory"
  },
  "8": {
    id: "8",
    name: "JAYA KARAN",
    role: "Treasury",
    photos: [
      "JayaKaran.jpg"
    ],
    description: "Cyborg",
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}"
  },
  "9": {
    id: "9",
    name: "HEMANTH RAJ",
    role: "Technical Lead",
    photos: [
      "Hemanth.jpg"
    ],
    description: "Based on the Given Prompt: I'm a developur who depends on Caffeine and Googling. Whether it's teaching a 3D avatar to show emotions, building a chatbot that talks back (literally), or debugging jwt tokens, I'm always up for a challenge. My projects range from crafting immersive virtual experiences to creating elegant UI components BECAUSE why settle for simple when you can make it extraordinary? Tailwind CSS is my comfort zone, Prisma keeps my databases in check, and Next.js is where all the magic happens. And no this isn't ChatGPT generated, TRUST ME!",
    portfolio: "https://hemanthraj0c.github.io/My-First-Portfolio/",
    energySource: "Coffee, Coke or anything with caffeine",
    dimension: "800 x 600 (4:3)",
    type: "As long as it Breaths",
    hobbiesInstalled: "Thinking about hobbies... (Still can't figure out)",
    specialFeatures: "Sometimes Human, Runs a simulation before an actual scenario, Sarcasm Yes"
  },
  "10": {
    id: "10",
    name: "AKSHAY KUMAR",
    role: "Chief Designer",
    photos: [
      "Akshay.jpg"
    ],
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}"
  },
  "11": {
    id: "11",
    name: "VISHAL",
    role: "Project Lead",
    photos: [
      "Vishal.jpg"
    ],
    description: "${CONTENT?'':DEFAULT}",
    portfolio: "I don't have one",
    energySource: "${CONTENT?'':DEFAULT}",
    dimension: "${CONTENT?'':DEFAULT}",
    type: "${CONTENT?'':DEFAULT}",
    hobbiesInstalled: "${CONTENT?'':DEFAULT}",
    specialFeatures: "${CONTENT?'':DEFAULT}"
  },
  "12": {
    id: "12",
    name: "ALWIN ARUN SHELVAN",
    role: "Documentation",
    photos: [
      "Alwin.jpg"
    ],
    description: "A Floridian Guy who acts like the team's Wi-Fi—always there when you need me, but somehow vanishing when you don't. I'm a master of creating problems (Case karan eyy namma tha) and, when I feel like it, solving them. I bring calm to the chaos, unless I'm the one making it, of course. Whether I'm adding unnecessary complexity to simple tasks or motivating everyone (by sheer force of my silent presence), I make sure no day is ever boring. I'm the quiet storm that gets things done—whether anyone asked for it or not.",
    portfolio: "I don't have one",
    energySource: "Any restaurant (Non-veg) at Florida… :)",
    dimension: "1:1 (Perfect balance of skill and dedication)",
    type: "Processing…. :( <Process Failed>",
    hobbiesInstalled: "Playing Basketball (Indian Stephen Curry), Watching “Tamil” Movies (Anil mode activated)",
    specialFeatures: "Orator, Good listener, Punctual"
  },
};

const app = express();
app.use(cors());

app.get("/api/events", (req, res) => {
  res.json(events);
});

app.get("/api/events/:id", (req, res) => {
  res.json(events[req.params.id]);
});

app.get("/api/members", (req, res) => {
  res.json(members);
});
app.get("/api/members/:id", (req, res) => {
  res.json(members[req.params.id]);
});

app.get("/api/podcasts", (req, res) => {
  res.json(podcasts);
});
app.get("/api/podcasts/:id", (req, res) => {
  res.json(podcasts[req.params.id]);
});
app.use("/api/podcasts/:id/stream", (req, res) => {
  try {
    let filePath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "audio",
      req.params.id.replace(/^0+/, "")
    );
    let stat = fs.statSync(filePath);
    let size = stat.size;
    res.writeHead(200, {
      "Content-Type": `audio/${podcasts[req.params.id].mime}`,
      "Content-Length": size,
    });
    let stream = fs.createReadStream(filePath);
    stream.pipe(res);
    stream.on("error", (err) => {
      next(err);
    });
  } catch (error) {
    next(error);
  }
});

app.get("/images/are/not/here/:id", (req, res) => {
  try {
    const binary = fs.readFileSync(
      path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "photos",
        req.params.id.replace(/^0+/, "")
      ),
      { encoding: null }
    );
    res.header("Content-Type", `image/${photos[req.params.id]}`);
    res.send(Buffer.from(binary));
  } catch (error) {
    next(error);
  }
});

app.get("/api/credits", (req, res) => {
  res.sendFile("credits.json", {
    root: path.dirname(fileURLToPath(import.meta.url)),
  });
});

app.listen(3001, () => {
  console.log("server start in http://localhost:3001");
});