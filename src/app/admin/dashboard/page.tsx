import { DollarSign, Users, Mail, MessageSquare, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

const donationData = [
  { month: "Jan", amount: 12500 },
  { month: "Feb", amount: 15800 },
  { month: "Mar", amount: 18200 },
  { month: "Apr", amount: 14500 },
  { month: "May", amount: 21000 },
  { month: "Jun", amount: 25800 },
]

const maxAmount = Math.max(...donationData.map(d => d.amount))

const stats = [
  {
    title: "Total Donations",
    value: "$107,800",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "bg-green-500",
  },
  {
    title: "Newsletter Subscribers",
    value: "3,456",
    change: "+8.2%",
    trend: "up",
    icon: Mail,
    color: "bg-blue-500",
  },
  {
    title: "Contact Messages",
    value: "128",
    change: "+3.1%",
    trend: "up",
    icon: MessageSquare,
    color: "bg-purple-500",
  },
  {
    title: "Active Team Members",
    value: "24",
    change: "-2.0%",
    trend: "down",
    icon: Users,
    color: "bg-orange-500",
  },
]

const recentDonations = [
  { name: "John D.", amount: "$500", date: "2 hours ago", status: "completed" },
  { name: "Sarah M.", amount: "$100", date: "5 hours ago", status: "completed" },
  { name: "Anonymous", amount: "$250", date: "1 day ago", status: "completed" },
  { name: "Michael B.", amount: "$50", date: "1 day ago", status: "pending" },
  { name: "Emily R.", amount: "$1000", date: "2 days ago", status: "completed" },
]

const recentContacts = [
  { name: "David O.", subject: "Volunteer Inquiry", date: "1 hour ago" },
  { name: "Lisa K.", subject: "Partnership Proposal", date: "3 hours ago" },
  { name: "James W.", subject: "Treatment Information", date: "5 hours ago" },
  { name: "Grace M.", subject: "Donation Question", date: "1 day ago" },
]

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground">Overview</h2>
        <p className="text-foreground-light">Here&apos;s what&apos;s happening with your organization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === "up" ? "text-green-500" : "text-red-500"
              }`}>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            <p className="text-foreground-light text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Donation Trends
            </h3>
            <TrendingUp className="w-5 h-5 text-foreground-light" />
          </div>
          <div className="flex items-end justify-between h-64 gap-2">
            {donationData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary-dark"
                  style={{ height: `${(item.amount / maxAmount) * 100}%` }}
                />
                <span className="text-xs text-foreground-light">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-6">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/admin/pages/new"
              className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
            >
              <span className="block text-foreground font-medium">New Page</span>
              <span className="text-foreground-light text-sm">Create content</span>
            </a>
            <a
              href="/admin/donations"
              className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
            >
              <span className="block text-foreground font-medium">View Donations</span>
              <span className="text-foreground-light text-sm">Manage gifts</span>
            </a>
            <a
              href="/admin/newsletter"
              className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
            >
              <span className="block text-foreground font-medium">Send Newsletter</span>
              <span className="text-foreground-light text-sm">Email subscribers</span>
            </a>
            <a
              href="/admin/settings"
              className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
            >
              <span className="block text-foreground font-medium">Site Settings</span>
              <span className="text-foreground-light text-sm">Configure site</span>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Recent Donations
            </h3>
            <a href="/admin/donations" className="text-primary text-sm hover:underline">
              View All
            </a>
          </div>
          <div className="space-y-4">
            {recentDonations.map((donation, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{donation.name}</p>
                    <p className="text-sm text-foreground-light">{donation.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{donation.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    donation.status === "completed" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {donation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Recent Messages
            </h3>
            <a href="/admin/contacts" className="text-primary text-sm hover:underline">
              View All
            </a>
          </div>
          <div className="space-y-4">
            {recentContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{contact.name}</p>
                    <p className="text-sm text-foreground-light">{contact.subject}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground-light">{contact.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
