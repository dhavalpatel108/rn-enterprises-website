import { prisma } from './src/lib/prisma';

async function main() {
  const doors = [
    { id: "laminate", name: "Laminate", subtitle: "Durable & Versatile", img: "/laminate_door.jpg", pdf: "" },
    { id: "lamination", name: "Lamination", subtitle: "Scratch Resistant", img: "/lamination_door_new.jpg", pdf: "" },
    { id: "pvc", name: "PVC", subtitle: "Moisture Resistant", img: "/pvc_door.jpg", pdf: "" },
    { id: "frp", name: "FRP", subtitle: "Weather Proof", img: "/frp_door.jpg", pdf: "" },
    { id: "acp", name: "ACP", subtitle: "Modern Aluminum", img: "/acp_door.jpg", pdf: "" },
    { id: "teakwood", name: "Teakwood", subtitle: "Premium Heritage", img: "/teakwood_door.jpg", pdf: "" }
  ];

  await prisma.config.upsert({
    where: { key: 'doors' },
    update: { value: JSON.stringify(doors) },
    create: { id: 'doors', key: 'doors', value: JSON.stringify(doors) }
  });

  console.log("Migrated legacy doors into dynamic configuration!");
}

main().catch(console.error).finally(async () => {
  await prisma.$disconnect();
});
