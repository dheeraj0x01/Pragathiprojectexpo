import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SRU Pragathi database...');
  
  // Clean up
  await prisma.checkIn.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const superAdmin = await prisma.user.create({
    data: {
      id: 'usr_superadmin_01',
      name: 'Dr. K. Srinivas',
      email: 'convener.pragathi@sru.edu.in',
      phone: '+91 9876543210',
      role: 'SUPER_ADMIN',
      college: 'SR University',
      department: 'School of Computer Science & AI',
      rollNo: 'FAC-SRU-1002',
    },
  });

  const participant = await prisma.user.create({
    data: {
      id: 'usr_part_06',
      name: 'Priya Patel',
      email: 'priya.part@gmail.com',
      phone: '+91 9123456789',
      role: 'PARTICIPANT',
      college: 'SR University',
      rollNo: '22SRU01EC044',
    },
  });

  // Create Event
  const hackEvent = await prisma.event.create({
    data: {
      id: 'evt_hack_01',
      title: 'HackPragathi 2026 - 24hr National Hackathon',
      slug: 'hackpragathi-2026',
      description: 'The flagship 24-hour national hackathon of SR University bringing together top student developers across AI, Blockchain, and IoT.',
      category: 'TECHNICAL',
      status: 'REGISTRATION_OPEN',
      bannerUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
      venue: 'SRU Innovation Center - Auditorium 1',
      eventDate: new Date(Date.now() + 86400000 * 5),
      maxParticipants: 300,
      registrationFee: 250,
      minTeamSize: 2,
      maxTeamSize: 4,
      createdById: superAdmin.id,
    },
  });

  // Create Registration
  const registration = await prisma.registration.create({
    data: {
      id: 'reg_01',
      ticketCode: 'SRU-PRG26-HACK-89A12',
      eventId: hackEvent.id,
      userId: participant.id,
      teamName: 'Algorithmic Titans',
      status: 'CONFIRMED',
      paymentStatus: 'MOCK_PAID',
      paymentTxnId: 'TXN_SRU_98472918',
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
