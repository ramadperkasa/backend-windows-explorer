import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding...");

  try {
    await prisma.$connect();

    await prisma.file.deleteMany();
    await prisma.folder.deleteMany();

    console.log("Seeding folders...");

    // ** Root Folders (No Parent) **
    const documentsFolder = await prisma.folder.create({
      data: { name: "Documents" },
    });
    const projectsFolder = await prisma.folder.create({
      data: { name: "Projects" },
    });
    const personalFolder = await prisma.folder.create({
      data: { name: "Personal" },
    });
    const miscellaneousFolder = await prisma.folder.create({
      data: { name: "Miscellaneous" },
    });

    // ** Level 2 (Subfolders) **
    const workDocsFolder = await prisma.folder.create({
      data: { name: "Work Documents", parentId: documentsFolder.id },
    });
    const invoicesFolder = await prisma.folder.create({
      data: { name: "Invoices", parentId: documentsFolder.id },
    });

    const projectA = await prisma.folder.create({
      data: { name: "Project A", parentId: projectsFolder.id },
    });
    const projectB = await prisma.folder.create({
      data: { name: "Project B", parentId: projectsFolder.id },
    });

    const photosFolder = await prisma.folder.create({
      data: { name: "Photos", parentId: personalFolder.id },
    });
    const musicFolder = await prisma.folder.create({
      data: { name: "Music", parentId: personalFolder.id },
    });

    // ** Level 3 (Nested Subfolders) **
    const reportsFolder = await prisma.folder.create({
      data: { name: "Reports", parentId: workDocsFolder.id },
    });
    const receiptsFolder = await prisma.folder.create({
      data: { name: "Receipts", parentId: invoicesFolder.id },
    });

    const projectAAssets = await prisma.folder.create({
      data: { name: "Assets", parentId: projectA.id },
    });
    const projectAReferences = await prisma.folder.create({
      data: { name: "References", parentId: projectA.id },
    });

    const vacationPhotos = await prisma.folder.create({
      data: { name: "Vacation", parentId: photosFolder.id },
    });
    const familyPhotos = await prisma.folder.create({
      data: { name: "Family", parentId: photosFolder.id },
    });

    // ** Level 4 (Deepest Nested Folders) **
    const q1Reports = await prisma.folder.create({
      data: { name: "Q1 Reports", parentId: reportsFolder.id },
    });
    const q2Reports = await prisma.folder.create({
      data: { name: "Q2 Reports", parentId: reportsFolder.id },
    });

    const flightReceipts = await prisma.folder.create({
      data: { name: "Flight Receipts", parentId: receiptsFolder.id },
    });
    const hotelReceipts = await prisma.folder.create({
      data: { name: "Hotel Receipts", parentId: receiptsFolder.id },
    });

    await prisma.file.createMany({
      data: [
        // Root Files
        { name: "ReadMe.txt", folderId: miscellaneousFolder.id },
        { name: "To-Do List.xlsx", folderId: miscellaneousFolder.id },
        { name: "Shopping List.txt", folderId: miscellaneousFolder.id },
        { name: "Recipes.docx", folderId: miscellaneousFolder.id },
        { name: "Notes.txt", folderId: miscellaneousFolder.id },

        // Documents
        { name: "Company Policy.pdf", folderId: documentsFolder.id },
        { name: "Employee Handbook.pdf", folderId: documentsFolder.id },
        { name: "Quarterly Presentation.pptx", folderId: documentsFolder.id },
        { name: "Meeting Agenda.docx", folderId: documentsFolder.id },
        { name: "Meeting Minutes.docx", folderId: documentsFolder.id },
        { name: "Project Proposal.docx", folderId: documentsFolder.id },
        { name: "Project Plan.xlsx", folderId: documentsFolder.id },
        { name: "Project Timeline.xlsx", folderId: documentsFolder.id },

        // Work Documents
        { name: "Meeting Notes.docx", folderId: workDocsFolder.id },
        { name: "Task List.xlsx", folderId: workDocsFolder.id },
        { name: "Project Plan.docx", folderId: workDocsFolder.id },
        { name: "Project Timeline.xlsx", folderId: workDocsFolder.id },

        // Reports
        { name: "Annual Report 2024.pdf", folderId: reportsFolder.id },
        { name: "Performance Metrics.pdf", folderId: reportsFolder.id },
        { name: "Market Analysis.docx", folderId: reportsFolder.id },

        // Invoices
        { name: "January Invoice.pdf", folderId: invoicesFolder.id },
        { name: "February Invoice.pdf", folderId: invoicesFolder.id },
        { name: "March Invoice.pdf", folderId: invoicesFolder.id },

        // Receipts
        { name: "Laptop Purchase.pdf", folderId: receiptsFolder.id },
        { name: "Office Supplies Receipt.pdf", folderId: receiptsFolder.id },

        // Flight Receipts
        { name: "Airline Ticket - Jakarta.pdf", folderId: flightReceipts.id },
        { name: "Airline Ticket - Bali.pdf", folderId: flightReceipts.id },

        // Hotel Receipts
        { name: "Hotel Booking - Jakarta.pdf", folderId: hotelReceipts.id },
        { name: "Hotel Booking - Bali.pdf", folderId: hotelReceipts.id },

        // Project A
        { name: "Wireframe.pdf", folderId: projectAAssets.id },
        { name: "Logo Design.png", folderId: projectAAssets.id },
        { name: "Project Timeline.xlsx", folderId: projectAReferences.id },

        // Project B
        { name: "Proposal Draft.docx", folderId: projectB.id },
        { name: "Budget Estimation.xlsx", folderId: projectB.id },

        // Photos
        { name: "Birthday Party.jpg", folderId: photosFolder.id },
        { name: "New Year Celebration.jpg", folderId: photosFolder.id },

        // Vacation Photos
        { name: "Beach Sunset.jpg", folderId: vacationPhotos.id },
        { name: "Mountain View.jpg", folderId: vacationPhotos.id },
        { name: "City Tour.jpg", folderId: vacationPhotos.id },

        // Family Photos
        { name: "Family Dinner.jpg", folderId: familyPhotos.id },
        { name: "Graduation Ceremony.jpg", folderId: familyPhotos.id },

        // Music
        { name: "Favorite Song.mp3", folderId: musicFolder.id },
        { name: "Jazz Playlist.mp3", folderId: musicFolder.id },
        { name: "Rock Collection.mp3", folderId: musicFolder.id },

        // Miscellaneous
        { name: "Shopping List.txt", folderId: miscellaneousFolder.id },
        { name: "Recipes.docx", folderId: miscellaneousFolder.id },
        { name: "Notes.txt", folderId: miscellaneousFolder.id },
      ],
    });

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
