# HASS: Home Automation Smart System

HASS is a smart home system that lets you control and monitor home appliances from a mobile app. An **ESP32** control board switches the loads, **Flutter** powers the app, and **Firebase** keeps everything in sync in real time.

This repository contains the **official project website**: product overview, app showcase, shop, FAQ, contact page, and the full project documentation.

**Live website:** https://mohamedahmedmohiy.github.io/Home-Automation-Smart-System-HASS-/

---

## Features

- **Remote control** of lights and appliances from the mobile app
- **Real-time sync** between the app and the control board through Firebase
- **Countdown timers and scheduling** to cut power use and lower the monthly electricity bill
- **Climate logic (IF / THEN rules)** driven by DHT22 temperature and humidity readings
- **AI habit analysis** that learns how the user lives and gives recommendations
- **Modular relay cards** for switching high-load devices
- **Board pairing and slot allocation** from inside the app
- **On-board display** with local buttons and status LEDs

## Tech Stack

| Layer | Technology |
|---|---|
| Microcontroller | ESP32 |
| Mobile app | Flutter |
| Database / sync | Firebase |
| Sensors | DHT22 (temperature and humidity), current sensing |
| Switching | Relay modules |
| Website | HTML, CSS, JavaScript |

## Website Structure

```
HASS-website/
├── index.html       Landing page (entry point)
├── home/            Landing page styles, script and images
├── about/           Project story and team
├── app/             Mobile app showcase
├── shop/            Hardware products
├── documentation/   Full project documentation
├── faq/             Frequently asked questions
├── contact/         Contact form and location
└── common/          Shared styles, scripts, logo and mascot images
```

Each page folder holds its own `.html`, `.css`, `.js` and `img/` files. Anything shared between pages lives in `common/`.

## Run Locally

No build step is needed. Clone the repository and open the main page in your browser:

```bash
git clone https://github.com/MohamedAhmedmohiy/Home-Automation-Smart-System-HASS-.git
cd Home-Automation-Smart-System-HASS-
```

Then open `index.html` in your browser.

## Team

- Fadi Sobhy
- Rawan Elsharawy
- Mohamed Ahmed
- Julia Essam
- Noureldeen Elhamy
- Yousef Iskandar

**Supervisor:** Dr. Amira Abdelmoneim
**Institution:** Future Academy

## Notes

This is a graduation project. The shop and contact pages are part of the project presentation.
