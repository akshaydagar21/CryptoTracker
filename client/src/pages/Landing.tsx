import { ArrowRight, TrendingUp, Shield, Zap, BarChart3 } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: TrendingUp,
    title: 'Real-Time Tracking',
    description: 'Monitor cryptocurrency prices with live updates every second'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive charts and market analysis tools'
  },
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Bank-level security for your portfolio tracking'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant data updates and seamless user experience'
  }
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80 overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-crypto-green/10 via-crypto-blue/10 to-crypto-purple/10 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crypto-green/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-crypto-blue/5 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            {/* Logo/Brand */}
            <div className="inline-flex items-center space-x-2 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-crypto-green to-crypto-blue flex items-center justify-center glow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-space-grotesk bg-gradient-to-r from-crypto-green to-crypto-blue bg-clip-text text-transparent">
                CryptoTracker Pro
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold font-space-grotesk leading-tight">
              Track Crypto Like a{' '}
              <span className="bg-gradient-to-r from-crypto-green via-crypto-blue to-crypto-purple bg-clip-text text-transparent animate-pulse">
                Pro
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Monitor real-time cryptocurrency prices, analyze market trends, and make informed decisions with our advanced tracking platform.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center pt-8">
              <Link to="/dashboard">
                <Button size="lg" className="glass-card glow-sm group relative overflow-hidden px-8 py-4 text-lg font-semibold">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Start Tracking</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-crypto-green/20 to-crypto-blue/20 group-hover:from-crypto-green/30 group-hover:to-crypto-blue/30 transition-all" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold font-space-grotesk text-crypto-green">10K+</div>
                <div className="text-muted-foreground">Cryptocurrencies</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold font-space-grotesk text-crypto-blue">24/7</div>
                <div className="text-muted-foreground">Real-time Updates</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold font-space-grotesk text-crypto-purple">99.9%</div>
                <div className="text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
              Why Choose CryptoTracker Pro?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for traders, investors, and crypto enthusiasts who demand the best tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="glass-card glow-sm group hover:glow-md transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-crypto-green/20 to-crypto-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-crypto-green" />
                    </div>
                    <h3 className="text-xl font-semibold font-space-grotesk">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative py-20 bg-gradient-to-r from-crypto-green/5 via-crypto-blue/5 to-crypto-purple/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
            Ready to Start Trading?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join thousands of traders using CryptoTracker Pro to maximize their crypto investments
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="glass-card glow-md group px-8 py-4 text-lg font-semibold">
              <span className="flex items-center space-x-2">
                <span>Launch Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}