import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Medal, Award, Star } from "lucide-react";

const stats = [
  { value: "8+", label: "Total Awards", icon: Trophy },
  { value: "5", label: "First Places", icon: Medal },
  { value: "₹28K+", label: "Prize Money", icon: Award },
  { value: "2025", label: "Active Year", icon: Star },
];

const achievements = [
  {
    place: "1st",
    title: "Winner – 24-Hour Hackathon",
    venue: "Velure Institute of Technology",
    prize: "Internship Offer",
    year: "2025",
  },
  {
    place: "2nd",
    title: "Second Place – Hackfest",
    venue: "Chettinad College",
    prize: "₹10,000",
    year: "2025",
  },
  {
    place: "2nd",
    title: "Second Place – 12-Hour Hackathon",
    venue: "Sriram Institute",
    prize: "₹3,000",
    year: "2025",
  },
  {
    place: "1st",
    title: "First Place – Ideation",
    venue: "Velammal Institute",
    prize: "₹2,500",
    year: "2025",
  },
  {
    place: "1st",
    title: "First Place – Enginuity Fest",
    venue: "Gojan School",
    prize: "₹5,000",
    year: "2025",
  },
  {
    place: "2nd",
    title: "Second Place – Tech Summit",
    venue: "New Horizon College, Bangalore",
    prize: "₹5,000",
    year: "2025",
  },
  {
    place: "1st",
    title: "First Place – Paper Presentation",
    venue: "Aalim College",
    prize: "₹2,000",
    year: "2025",
  },
  {
    place: "2nd",
    title: "Second Place – Project Expo",
    venue: "Aalim College",
    prize: "₹1,000",
    year: "2025",
  },
  {
    place: "1st",
    title: "First Place – Project Expo",
    venue: "Savitha College Of Engineering",
    prize: "₹4,000",
    year: "2025",
  },
  {
    place: "1st",
    title: "First Place – Project Expo",
    venue: "Velammal Engineering collage",
    prize: "₹4,000",
    year: "2026",
  },
  {
    place: "1st",
    title: "First Place – Project Expo",
    venue: "RMD College Of Engineering",
    prize: "₹1,500",
    year: "2026",
  },
  {
    place: "2nd",
    title: "second Place – Paper Presentation",
    venue: "RMD College Of Engineering",
    prize: "₹1,000",
    year: "2025",
  },
  {
    place: "2nd",
    title: "Second Place - 36 hrs Hackathon",
    venue: "New Prince College Of Engineering",
    prize: "₹12,000",
    year: "2026",
  },
  
  
  
  
];

export const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Awards & <span className="text-gradient-gold">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognition from hackathons, competitions, and innovation programs
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-dark rounded-2xl p-6 text-center border-gold-gradient"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-3xl font-display font-bold text-gradient-gold">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              className="glass-dark rounded-xl p-5 hover:border-primary/50 transition-all duration-300"
            >
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                  achievement.place === "1st"
                    ? "bg-gradient-gold text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {achievement.place}
              </div>
              <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">
                {achievement.venue}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-primary font-medium">
                  {achievement.prize}
                </span>
                <span className="text-muted-foreground">{achievement.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
