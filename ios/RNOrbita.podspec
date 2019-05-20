
Pod::Spec.new do |s|
  s.name         = "RNOrbita"
  s.version      = "1.0.0"
  s.summary      = "RNOrbita"
  s.description  = <<-DESC
                  RNOrbita
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNOrbita.git", :tag => "master" }
  s.source_files  = "RNOrbita/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  