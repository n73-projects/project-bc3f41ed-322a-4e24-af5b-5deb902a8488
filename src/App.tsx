import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Calendar, Clock, User, Palette, DollarSign, Phone, Mail, Scissors } from "lucide-react";

interface Appointment {
  id: string;
  clientName: string;
  date: string;
  time: string;
  service: string;
  status: "scheduled" | "completed" | "cancelled";
  price: number;
  notes: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSessions: number;
  totalSpent: number;
  lastVisit: string;
}

interface Portfolio {
  id: string;
  title: string;
  style: string;
  size: string;
  description: string;
  imageUrl: string;
}

function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      clientName: "Alex Johnson",
      date: "2024-01-15",
      time: "14:00",
      service: "Large Sleeve Tattoo",
      status: "scheduled",
      price: 800,
      notes: "Dragon design on left arm"
    },
    {
      id: "2",
      clientName: "Sarah Williams",
      date: "2024-01-16",
      time: "10:00",
      service: "Small Wrist Tattoo",
      status: "completed",
      price: 150,
      notes: "Minimalist rose design"
    }
  ]);

  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@email.com",
      phone: "(555) 123-4567",
      totalSessions: 3,
      totalSpent: 1200,
      lastVisit: "2024-01-10"
    },
    {
      id: "2",
      name: "Sarah Williams",
      email: "sarah@email.com",
      phone: "(555) 987-6543",
      totalSessions: 1,
      totalSpent: 150,
      lastVisit: "2024-01-05"
    }
  ]);

  const [portfolio] = useState<Portfolio[]>([
    {
      id: "1",
      title: "Dragon Sleeve",
      style: "Traditional Japanese",
      size: "Large",
      description: "Full arm dragon with cherry blossoms",
      imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400"
    },
    {
      id: "2",
      title: "Rose Minimalist",
      style: "Minimalist",
      size: "Small",
      description: "Simple black line rose design",
      imageUrl: "https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=400"
    },
    {
      id: "3",
      title: "Geometric Wolf",
      style: "Geometric",
      size: "Medium",
      description: "Abstract geometric wolf head",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    clientName: "",
    date: "",
    time: "",
    service: "",
    price: 0,
    notes: ""
  });

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [priceCalculation, setPriceCalculation] = useState({
    size: "",
    complexity: "",
    hours: 0,
    hourlyRate: 150
  });

  const calculatePrice = () => {
    const { size, complexity, hours, hourlyRate } = priceCalculation;
    if (!size || !complexity || hours === 0) return 0;

    let basePrice = hours * hourlyRate;

    // Size multiplier
    const sizeMultiplier = {
      small: 0.8,
      medium: 1.0,
      large: 1.3,
      xlarge: 1.6
    }[size] || 1;

    // Complexity multiplier
    const complexityMultiplier = {
      simple: 0.9,
      moderate: 1.0,
      complex: 1.3,
      detailed: 1.5
    }[complexity] || 1;

    return Math.round(basePrice * sizeMultiplier * complexityMultiplier);
  };

  const addAppointment = () => {
    if (!newAppointment.clientName || !newAppointment.date || !newAppointment.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      status: "scheduled"
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({
      clientName: "",
      date: "",
      time: "",
      service: "",
      price: 0,
      notes: ""
    });
    toast.success("Appointment scheduled successfully!");
  };

  const addClient = () => {
    if (!newClient.name || !newClient.email) {
      toast.error("Please fill in name and email");
      return;
    }

    const client: Client = {
      id: Date.now().toString(),
      ...newClient,
      totalSessions: 0,
      totalSpent: 0,
      lastVisit: "Never"
    };

    setClients([...clients, client]);
    setNewClient({
      name: "",
      email: "",
      phone: ""
    });
    toast.success("Client added successfully!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const todaysAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);
  const totalRevenue = appointments.filter(apt => apt.status === "completed").reduce((sum, apt) => sum + apt.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-4 sm:py-0">
            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
              <Scissors className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">InkMaster Studio</h1>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600 text-xs sm:text-sm">
                <DollarSign className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Revenue: </span>${totalRevenue}
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-600 text-xs sm:text-sm">
                <Calendar className="w-3 h-3 mr-1" />
                <span className="hidden sm:inline">Today: </span>{todaysAppointments.length} <span className="hidden sm:inline">appointments</span><span className="sm:hidden">apt</span>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-2 sm:px-4 lg:px-8">
        <Tabs defaultValue="dashboard" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Appointments</span>
              <span className="sm:hidden">Appts</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="text-xs sm:text-sm">Clients</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs sm:text-sm col-span-1 lg:col-span-1">
              <span className="hidden sm:inline">Portfolio</span>
              <span className="sm:hidden">Work</span>
            </TabsTrigger>
            <TabsTrigger value="pricing" className="text-xs sm:text-sm col-span-2 sm:col-span-1">Pricing</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{clients.length}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todaysAppointments.length}</div>
                  <p className="text-xs text-muted-foreground">Next at 2:00 PM</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalRevenue}</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Portfolio Pieces</CardTitle>
                  <Palette className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{portfolio.length}</div>
                  <p className="text-xs text-muted-foreground">Showcase your work</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
                <CardDescription>Your latest scheduled and completed sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.slice(0, 3).map((appointment) => (
                    <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{appointment.clientName}</p>
                          <p className="text-sm text-gray-500 truncate">{appointment.service}</p>
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col sm:text-right items-center sm:items-end justify-between sm:justify-start space-x-2 sm:space-x-0">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <p className="text-sm text-gray-500 whitespace-nowrap">{appointment.date} at {appointment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold">Appointments</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">New Appointment</span>
                    <span className="sm:hidden">New</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Schedule New Appointment</DialogTitle>
                    <DialogDescription>Book a new tattoo session for your client</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Input
                      placeholder="Client Name"
                      value={newAppointment.clientName}
                      onChange={(e) => setNewAppointment({...newAppointment, clientName: e.target.value})}
                    />
                    <Input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                    />
                    <Input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    />
                    <Select onValueChange={(value) => setNewAppointment({...newAppointment, service: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small Tattoo (1-3 hours)</SelectItem>
                        <SelectItem value="medium">Medium Tattoo (3-6 hours)</SelectItem>
                        <SelectItem value="large">Large Tattoo (6+ hours)</SelectItem>
                        <SelectItem value="touch-up">Touch-up Session</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Price ($)"
                      value={newAppointment.price || ""}
                      onChange={(e) => setNewAppointment({...newAppointment, price: Number(e.target.value)})}
                    />
                    <Textarea
                      placeholder="Notes (design details, placement, etc.)"
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                    />
                    <Button onClick={addAppointment}>Schedule Appointment</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                      <div className="flex items-start sm:items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-lg truncate">{appointment.clientName}</h3>
                          <p className="text-gray-600 truncate">{appointment.service}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{appointment.notes}</p>
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start sm:text-right space-x-4 sm:space-x-0 sm:space-y-2">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        <div className="text-sm text-gray-500 text-right">
                          <p className="whitespace-nowrap">{appointment.date}</p>
                          <p className="whitespace-nowrap">{appointment.time}</p>
                        </div>
                        <p className="font-semibold text-lg whitespace-nowrap">${appointment.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold">Clients</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <User className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Add Client</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Client</DialogTitle>
                    <DialogDescription>Add a new client to your database</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Input
                      placeholder="Full Name"
                      value={newClient.name}
                      onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={newClient.email}
                      onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    />
                    <Input
                      placeholder="Phone Number"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    />
                    <Button onClick={addClient}>Add Client</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {clients.map((client) => (
                <Card key={client.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-lg truncate">{client.name}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-gray-600">
                            <span className="flex items-center truncate">
                              <Mail className="w-3 h-3 mr-1 flex-shrink-0" />
                              <span className="truncate">{client.email}</span>
                            </span>
                            <span className="flex items-center">
                              <Phone className="w-3 h-3 mr-1 flex-shrink-0" />
                              {client.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start sm:text-right space-x-4 sm:space-x-0">
                        <div className="text-sm text-gray-500">
                          <p className="whitespace-nowrap">Sessions: {client.totalSessions}</p>
                          <p className="whitespace-nowrap">Spent: ${client.totalSpent}</p>
                          <p className="whitespace-nowrap">Last: {client.lastVisit}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <h2 className="text-xl sm:text-2xl font-bold">Portfolio</h2>
              <Button className="w-full sm:w-auto">
                <Palette className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add Piece</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {portfolio.map((piece) => (
                <Card key={piece.id} className="overflow-hidden">
                  <div className="aspect-square bg-gray-200">
                    <img
                      src={piece.imageUrl}
                      alt={piece.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{piece.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{piece.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{piece.style}</Badge>
                      <Badge variant="secondary">{piece.size}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tattoo Price Calculator</CardTitle>
                <CardDescription>Calculate pricing based on size, complexity, and time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Tattoo Size</label>
                    <Select onValueChange={(value) => setPriceCalculation({...priceCalculation, size: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (2-4 inches)</SelectItem>
                        <SelectItem value="medium">Medium (4-6 inches)</SelectItem>
                        <SelectItem value="large">Large (6-8 inches)</SelectItem>
                        <SelectItem value="xlarge">X-Large (8+ inches)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Complexity</label>
                    <Select onValueChange={(value) => setPriceCalculation({...priceCalculation, complexity: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple (minimal detail)</SelectItem>
                        <SelectItem value="moderate">Moderate (some detail)</SelectItem>
                        <SelectItem value="complex">Complex (high detail)</SelectItem>
                        <SelectItem value="detailed">Very Detailed (intricate)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Estimated Hours</label>
                    <Input
                      type="number"
                      placeholder="Hours needed"
                      value={priceCalculation.hours || ""}
                      onChange={(e) => setPriceCalculation({...priceCalculation, hours: Number(e.target.value)})}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Hourly Rate ($)</label>
                    <Input
                      type="number"
                      value={priceCalculation.hourlyRate}
                      onChange={(e) => setPriceCalculation({...priceCalculation, hourlyRate: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                    <span className="text-lg font-medium">Estimated Price:</span>
                    <span className="text-2xl sm:text-3xl font-bold text-green-600">${calculatePrice()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing Guide</CardTitle>
                <CardDescription>Standard rates and guidelines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Size Categories</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Small (2-4"): $80-200</li>
                      <li>• Medium (4-6"): $200-500</li>
                      <li>• Large (6-8"): $500-1000</li>
                      <li>• X-Large (8+"): $1000+</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Additional Factors</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Color vs Black & Gray</li>
                      <li>• Placement difficulty</li>
                      <li>• Design complexity</li>
                      <li>• Touch-up sessions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;
