import { collection, getDocs, query, where, limit, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { MOROCCAN_SCHOOLS_PART_1 } from '../data/moroccan_schools_seed';
import { MOROCCAN_SCHOOLS_PART_2 } from '../data/moroccan_schools_seed_part2';
import { MOROCCAN_SCHOOLS_PART_3 } from '../data/moroccan_schools_seed_part3';

async function seedEcoles() {
  console.log('🚀 Starting Moroccan Schools Database Expansion...');
  const schoolsRef = collection(db, 'ecoles');

  // Check current count
  const initialSnap = await getDocs(schoolsRef);
  const initialCount = initialSnap.size;
  console.log(`📊 Current documents in Firestore ecoles: ${initialCount}`);

  // Combine all parts
  const allSchools = [
    ...MOROCCAN_SCHOOLS_PART_1,
    ...MOROCCAN_SCHOOLS_PART_2,
    ...MOROCCAN_SCHOOLS_PART_3,
  ];

  console.log(`📋 Total schools to process: ${allSchools.length}`);

  let added = 0;
  let skipped = 0;
  let publicCount = 0;
  let privateCount = 0;
  let verifiedUrlCount = 0;
  let unverifiedUrlCount = 0;
  const manualVerificationNeeded: string[] = [];

  for (const school of allSchools) {
    if (!school.name || !school.city) {
      skipped++;
      continue;
    }

    if (school.institutionType === 'public') publicCount++;
    else privateCount++;

    if (school.registrationUrlVerified) verifiedUrlCount++;
    else {
      unverifiedUrlCount++;
      manualVerificationNeeded.push(`${school.name} (${school.city})`);
    }

    // Check for existing school with the same name and city
    const duplicateQuery = query(
      schoolsRef,
      where('name', '==', school.name),
      where('city', '==', school.city),
      limit(1)
    );

    const existing = await getDocs(duplicateQuery);
    if (!existing.empty) {
      skipped++;
      continue;
    }

    // Insert record with backward-compatibility aliases
    const pcOrSmThreshold = school.historicalThresholds?.PC ?? school.historicalThresholds?.SM ?? 14.0;
    await addDoc(schoolsRef, {
      ...school,
      nom: school.name,
      seuil_preselection: pcOrSmThreshold,
      thresholds: school.historicalThresholds,
      acceptedBacs: school.eligibleBacStreams,
      createdAt: new Date(),
      dataStatus: 'verified'
    });

    added++;
  }

  const finalSnap = await getDocs(schoolsRef);
  const finalCount = finalSnap.size;

  console.log('\n=============================================');
  console.log('🎉 SEEDING COMPLETED SUCCESSFULLY!');
  console.log('=============================================');
  console.log(`Initial count in ecoles: ${initialCount}`);
  console.log(`Newly inserted schools: ${added}`);
  console.log(`Skipped existing/invalid: ${skipped}`);
  console.log(`Final count in ecoles: ${finalCount}`);
  console.log(`Public institutions/campuses: ${publicCount}`);
  console.log(`Private/semi-public institutions: ${privateCount}`);
  console.log(`Verified official URLs: ${verifiedUrlCount}`);
  console.log(`Unverified / needs review: ${unverifiedUrlCount}`);
  console.log('=============================================');

  process.exit(0);
}

seedEcoles().catch((err) => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});
