using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Orbita.ONOrbita
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class ONOrbitaModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="ONOrbitaModule"/>.
        /// </summary>
        internal ONOrbitaModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "ONOrbita";
            }
        }
    }
}
