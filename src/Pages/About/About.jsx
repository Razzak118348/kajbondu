import { Link } from "react-router-dom";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLoaderData } from 'react-router-dom';


const About = () => {

useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const allMembers = useLoaderData();
    console.log("allMembers", allMembers);

    if (!Array.isArray(allMembers)) {
        return <div className=" pt-20 text-center">No member data found.</div>;
    }
console.log("allMembers", allMembers);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-16 px-4 md:px-10">
<h1 className="text-xl md:text-3xl font-bold text-blue-600 dark:text-white text-center  mb-7">
           Contact With Our Team
          </h1>
<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">

                {allMembers.map((member, index) => (
                    <div
                        key={index}
                        className="bg-gradient-to-br from-zinc-900 via-gray-800 to-black text-white rounded-2xl shadow-2xl p-8 border border-gray-700 flex flex-col items-center"
                        data-aos="fade-up"
                        data-aos-delay={index * 150}
                    >
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-red-500 shadow-lg mb-4"
                        />
                        <h2 className="text-xl font-bold text-red-400 mb-2">{member.role}</h2>
                        <p className="text-lg font-semibold">{member.name}</p>
                        <p className="text-sm text-gray-300 mt-1">
                            📧 <a href={`mailto:${member.email}`} className="text-blue-400 hover:underline">{member.email}</a>
                        </p>
                        <p className="text-sm text-gray-300 mt-1">📞 {member.phone}</p>
                    </div>
                ))}
            </div>

      <div className="max-w-6xl mx-auto mt-20">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            About KajBondhu
          </h1>
          <p className=" md:text-lg text-gray-600 dark:text-gray-300">
            Empowering households & businesses in Dinajpur through on-demand trusted services.
          </p>
        </div>

        {/* Grid Content */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src="https://raw.githubusercontent.com/Razzak118348/kajbonduimage/main/Image/icon.png"
              alt="About KajBondhu"
              className="w-96 h-96 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Who We Are
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-4">
              KajBondhu is a local service marketplace based in Dinajpur, Bangladesh. We connect skilled and verified professionals with people who need help—whether it’s cleaning, plumbing, repairing electronics, or shifting homes.
            </p>

            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>Reliable home cleaning & maintenance services</li>
              <li>Trusted professionals for plumbing, electrical, and painting jobs</li>
              <li>Doorstep appliance repair (TV, fridge, AC, car, etc.)</li>
              <li>Skilled laborers and housemaids on demand</li>
              <li>Local tuition and academic support at home</li>
            </ul>

            <h2 className="text-lg md:text-xl font-semibold mt-6 mb-4 text-gray-800 dark:text-gray-200">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              To make daily life easier by bringing verified and affordable services to every doorstep in Dinajpur.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Need help or want to become a service provider?
          </p>
          <Link to={'/workerApplication'}>
          <button className="mt-4 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition">
            Apply as a Worker
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default About;
